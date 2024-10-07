import { useEffect, useState } from "react";
import _BookmarkCard from "./ui/BookmarkCard";
import { useQueries, useQuery } from "@tanstack/react-query";
import { GrAddCircle } from "react-icons/gr";
import { getAllBookmark } from "./utils/http";
import { IProfileData, useProfileData } from "./utils/useProfileData";
import TopicsCard from "./ui/TopicsCard";
import { useNavigate } from "react-router-dom";
import Loader from "./utils/Loader";
export interface IBookMark {
  _id: string;
  title: string;
  link: string;
  tag: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  topics?: string;
  // _v: number;
}
export const Bookmark =
  _BookmarkCard as unknown as React.JSXElementConstructor<{
    data: IBookMark;
  }>;

function AllBookMark() {
  const [bookmark, setBookmark] = useState<IBookMark[]>([]);
  const profileData = useProfileData();
  const navigate = useNavigate();
  console.log(profileData);
  // useEffect(() => {
  //   async function fetchData() {
  //     const req = await fetch("http://localhost:3008/api/get-all-bookmark", {
  //       credentials: "include",
  //     });
  //     const data = await req.json();
  //     console.log(data);
  //     setBookmark(data.data as IBookMark[]);
  //   }
  //   fetchData();
  // }, []);
  const { data, refetch } = useQuery({
    queryKey: ["all-bookmark"],
    queryFn: async () => {
      const data = await getAllBookmark();
      setBookmark(data);
      return data;
    },
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="min-w-0 max-w-96 flex flex-col  bg-blue-100 min-h-screen ">
          <div className="mx-2 px-2 my-2">
            <h3 className="p-1 max-w-64 break-words text-center bold text-lg">
              TOPICS
            </h3>
          </div>
          <div
            className="mx-2 px-2 bg-slate-900 rounded-2xl my-2 cursor-pointer"
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
            className="mx-2 px-2 bg-slate-900 rounded-2xl my-2 cursor-pointer"
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
          <div className="mx-auto min-w-screen grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookmark &&
              bookmark.map((el) => <Bookmark data={el} key={el._id} />)}
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
