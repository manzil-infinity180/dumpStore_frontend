import { FiExternalLink } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IBookMark } from "../AllBookMark";
import { TbEdit } from "react-icons/tb";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function BookmarkCard({ data }: { data: IBookMark }) {
  const navigate = useNavigate();
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: data._id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  function FindDate(date: Date) {
    const d1 = new Date(date);
    return d1.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="touch-none border pt-4 pb-4 px-2 bg-slate-100 flex flex-col  rounded-xl cursor-pointer max-h-72 min-w-64 max-w-96"
    >
      <div className="flex justify-end">
        <Link to={data.link} target="_blank">
          <FiExternalLink className="text-xl" />
        </Link>
      </div>
      <div className=" flex items-center justify-center">
        <img
          className="inline-block h-16 w-16 rounded-full ring-2 ring-white "
          src={data.image}
        />
      </div>

      <div className="flex flex-col">
        {/* <Link to={data.link} target="_blank"> */}
        <h1 className="flex items-center justify-center mt-2">{data.title}</h1>
        {/* </Link> */}
        <div>
          {data.tag.includes(",") &&
            data.tag
              .split(",")
              .map((x: string) => (
                <button className="w-1/4 bg-white border border-slate-500 rounded-xl m-1">
                  {x}
                </button>
              ))}
        </div>
      </div>
      <div className="flex justify-end items-end opacity-40">
        <Link to={`/edit/${data._id}`}>
          <TbEdit className="text-xl mr-1" />
        </Link>
        <p>{FindDate(data.createdAt as Date)}</p>
      </div>
    </div>
  );
}

export default BookmarkCard;
