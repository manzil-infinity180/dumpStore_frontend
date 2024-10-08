import { useMutation } from "@tanstack/react-query";
import React, { SetStateAction } from "react";
import { getBookMarkByTopic } from "../utils/http";
import { IBookMark } from "../AllBookMark";
interface ITopicsCard {
  topics: string;
  setBookmark: React.Dispatch<SetStateAction<IBookMark[]>>;
}
function TopicsCard({ topics, setBookmark }: ITopicsCard) {
  const { mutate } = useMutation({
    mutationFn: getBookMarkByTopic,
    onSuccess: () => {
      console.log("yeah");
    },
    onSettled: (data) => {
      setBookmark(data);
    },
  });
  //   console.log(data);
  function handleFunction() {
    console.log(topics);
    mutate(topics);
  }
  return (
    <>
      {topics && (
        <div
          className="mx-2 px-2 bg-slate-900 rounded-2xl my-2 cursor-pointer"
          onClick={handleFunction}
        >
          <h3 className="p-1 max-w-64 break-words text-white ">{topics}</h3>
        </div>
      )}
    </>
  );
}

export default TopicsCard;
