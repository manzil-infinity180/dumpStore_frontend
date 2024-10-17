import { useMutation } from "@tanstack/react-query";
import React, { SetStateAction } from "react";
import {
  deleteAllBookmarkByTopics,
  getBookMarkByTopic,
  queryclient,
} from "../utils/http";
import { IBookMark } from "../AllBookMark";
import { MdDeleteForever } from "react-icons/md";
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
  const { mutate: deleteAllTopicsMutate } = useMutation({
    mutationFn: deleteAllBookmarkByTopics,
    onSuccess: () => {
      console.log("yeah");
    },
    onSettled: () => {
      queryclient.invalidateQueries();
    },
  });
  //   console.log(data);
  function handleFunction(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest(".delete-btn")) {
      e.stopPropagation();
      // handle delete event
      const value = confirm(
        "Are you really want to delete topic and all the bookmark of that topic?"
      );
      console.log(value);
      if (value) {
        deleteAllTopicsMutate(topics);
      }
      return;
    }
    console.log(e.currentTarget);
    console.log(topics);
    mutate(topics);
  }
  return (
    <>
      {topics && (
        <>
          <div
            className="mx-2 px-2 bg-slate-800 rounded-2xl my-2 cursor-pointer flex justify-start items-center"
            onClick={handleFunction}
          >
            <h3 className="p-1 max-w-64 break-words text-white item">
              {topics}
            </h3>

            <MdDeleteForever
              size={25}
              className="mx-3 opacity-60 delete-btn"
              style={{ color: "red" }}
            />
          </div>
        </>
      )}
    </>
  );
}

export default TopicsCard;
