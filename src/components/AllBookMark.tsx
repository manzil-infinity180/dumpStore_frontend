import { useEffect, useState } from "react";
import _BookmarkCard from "./ui/BookmarkCard";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllBookmark } from "./utils/http";
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
  const { data } = useQuery({
    queryKey: ["all-bookmark"],
    queryFn: async () => {
      const data = await getAllBookmark();
      setBookmark(data);
      return data;
    },
  });
  return (
    <>
      <div className="ml-16 mr-4 mt-8">
        {data && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {bookmark &&
              bookmark.map((el) => <Bookmark data={el} key={el._id} />)}
          </div>
        )}
      </div>
    </>
  );
}

export default AllBookMark;
