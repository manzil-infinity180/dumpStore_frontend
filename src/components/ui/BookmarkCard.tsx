import { FiExternalLink } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IBookMark } from "../AllBookMark";
import { TbEdit } from "react-icons/tb";
function BookmarkCard({ data }: { data: IBookMark }) {
  const navigate = useNavigate();
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
      className="border pt-4 pb-4 px-2 bg-slate-100 flex flex-col  rounded-xl cursor-pointer my-3"
      //   onClick={() => window.open(data.link)}
    >
      <Link to={data.link} target="_blank">
        <div className="flex justify-end">
          <FiExternalLink className="text-xl" />
        </div>
        <div className=" flex items-center justify-center">
          <img
            className="inline-block h-16 w-16 rounded-full ring-2 ring-white "
            src={data.image}
          />
        </div>
      </Link>
      <div className="flex flex-col">
        <Link to={data.link} target="_blank">
          <h1 className="flex items-center justify-center mt-2">
            {data.title}
          </h1>
        </Link>
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
      <div
        className="flex justify-end items-end opacity-40 mt-2 mr-1"
        onClick={() => navigate(`/edit/${data._id}`)}
      >
        <TbEdit className="text-xl mr-1" />
        <p>{FindDate(data.createdAt as Date)}</p>
      </div>
    </div>
  );
}

export default BookmarkCard;
