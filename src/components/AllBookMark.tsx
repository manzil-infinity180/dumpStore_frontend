import { SetStateAction, useState } from "react";
import _BookmarkCard from "./ui/BookmarkCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GrAddCircle } from "react-icons/gr";
import { getAllBookmark, queryclient, saveBookmarkOrder } from "./utils/http";
import { useProfileData } from "./utils/useProfileData";
import TopicsCard from "./ui/TopicsCard";
import { useNavigate } from "react-router-dom";
import Loader from "./utils/Loader";
import SearchField from "./ui/SearchField";
import Navbar from "./ui/Navbar";
// dnd
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  TouchSensor,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useSensor, useSensors } from "@dnd-kit/core";
import toast from "react-hot-toast";
export interface IBookMark {
  _id: string;
  title: string;
  link: string;
  tag: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  topics?: string;
  position?: number;
  description?: string;
  // _v: number;
}
export const Bookmark =
  _BookmarkCard as unknown as React.JSXElementConstructor<{
    data: IBookMark;
    uploadDisableBtn: boolean;
  }>;

function AllBookMark() {
  const [bookmark, setBookmark] = useState<IBookMark[]>([]);
  const [activeItem, setActiveItem] = useState<IBookMark>();
  const [orderState, setOrderstate] = useState(false);
  const [uploadDisableBtn, setuploadDisableBtn] = useState(false);
  const profileData = useProfileData();
  const navigate = useNavigate();
  const { data, refetch } = useQuery({
    queryKey: ["all-bookmark"],
    queryFn: async () => {
      const data = await getAllBookmark();
      data.sort(function (a: IBookMark, b: IBookMark) {
        if (a.position !== undefined && b.position !== undefined) {
          return a.position - b.position;
        } else {
          return;
        }
      });
      console.log(data);
      setBookmark(data);
      return data;
    },
    refetchOnWindowFocus: false,
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
    useSensor(TouchSensor)
  );
  function handleDragStart(e: DragStartEvent) {
    const { active } = e;
    setActiveItem(bookmark.find((b) => b._id === active.id));
  }
  function handleDrag(e: DragEndEvent) {
    const { active, over } = e;
    if (over === null) return;
    const activeItem = bookmark.find((item) => item._id === active.id);
    const overItem = bookmark.find((item) => item._id === over.id);
    console.log({ activeItem, overItem });
    if (!activeItem || !overItem) {
      return;
    }
    const activeIndex = bookmark.findIndex((item) => item._id === active.id); // old
    const overIndex = bookmark.findIndex((item) => item._id === over.id); // new
    if (activeIndex !== overIndex) {
      console.log(bookmark);
      const newItems = arrayMove(bookmark, activeIndex, overIndex);
      console.log(newItems);
      setBookmark(newItems);
      setOrderstate(true);
      console.log(bookmark);
      // saveOrder(newItems);
    }
    setActiveItem(undefined);
  }
  const { mutate } = useMutation({
    mutationFn: saveBookmarkOrder,
    onSuccess: (data) => {
      console.log(data);
      setuploadDisableBtn(false);
      toast.success("Order Updated!");
    },
    onSettled: () => {
      queryclient.invalidateQueries({ queryKey: ["all-bookmark"] });
    },
  });
  const saveOrder = async () => {
    const reorderedData = bookmark.map((item, index) => ({
      _id: item._id,
      position: index, // Capture the new position for each item
    }));
    console.log(reorderedData);
    mutate(reorderedData);
    setOrderstate(false);
    setuploadDisableBtn(true);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };
  return (
    <>
      <Navbar login={true} />
      <div className="ml-24">
        <SearchField setBookmark={setBookmark} />
      </div>
      <button
        onClick={saveOrder}
        disabled={!orderState}
        className={`${
          !orderState && "opacity-45"
        } mx-4 border-2 border-black my-3 px-10 py-2 rounded-3xl bg-blue-500 shadow-xl hover:bg-blue-400`}
      >
        Save Order
      </button>
      <div className="flex flex-row w-full">
        <div className="min-w-0 max-w-96 flex flex-col min-h-screen  bg-blue-100 bg-opacity-35 ml-4 rounded-lg shadow-2xl transition-all duration-300">
          <div className="mx-2 px-2 my-2">
            <h3 className="p-1 max-w-64 break-words text-center bold text-lg">
              TOPICS
            </h3>
          </div>
          <div
            className="mx-2 px-2 bg-slate-900 rounded-2xl my-2 cursor-pointer bg-opacity-80"
            onClick={() => navigate("/create")}
          >
            <div className="p-1 max-w-64 break-words text-white flex flex-col justify-center items-center">
              <div className="">
                <GrAddCircle className="text-2xl" />
              </div>
              <span>Add New Bookmark</span>
            </div>
          </div>
          <div
            className="mx-2 px-2 bg-red-600 rounded-2xl my-2 cursor-pointer bg-opacity-75"
            onClick={() => refetch()}
          >
            <h3 className="p-1 max-w-64 break-words text-white ">Reset</h3>
          </div>
          {profileData &&
            profileData.topics &&
            profileData.topics.map((el) => (
              <TopicsCard topics={el} setBookmark={setBookmark} />
            ))}
        </div>
        {data ? (
          <div
            className={`${
              uploadDisableBtn && "opacity-45"
            }mx-auto min-w-screen grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
          >
            {uploadDisableBtn && <Loader />}
            <DndContext
              collisionDetection={closestCenter}
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDrag}
              onDragCancel={handleDragCancel}
            >
              <SortableContext
                items={bookmark.map((b) => ({ id: b._id }))}
                strategy={rectSortingStrategy}
              >
                {bookmark &&
                  bookmark.map((el) => (
                    <Bookmark
                      data={el}
                      key={el._id}
                      uploadDisableBtn={uploadDisableBtn}
                    />
                  ))}
              </SortableContext>
              {/* <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
                {bookmark &&
                  activeItem &&
                  bookmark.map((el) => <Bookmark data={el} key={el._id} />)}
              </DragOverlay> */}
            </DndContext>
            {bookmark && (
              <div className="flex items-center justify-center border pt-4 pb-4 px-2 bg-slate-100 flex-col  rounded-xl cursor-pointer max-h-72 min-w-64 max-w-96">
                <div className="flex justify-center items-center">
                  <GrAddCircle
                    className="text-5xl opacity-70 cursor-pointer"
                    onClick={() => navigate("/create")}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default AllBookMark;
