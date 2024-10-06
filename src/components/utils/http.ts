import { QueryClient } from "@tanstack/react-query";
export const queryclient = new QueryClient();
const server = "http://localhost:3008";
class APIError extends Error {
  status: number;
  info: string;

  constructor(message: string, status: number, info: string) {
    super(message);
    this.status = status;
    this.info = info;

    Object.setPrototypeOf(this, APIError.prototype);
  }
}
export interface IBookMark extends Document {
  title: string;
  link: string;
  description?: string;
  tag: string;
  topics?: string; // presently i perfer to go with optional
  image?: string;
}
/*
"status": "sucess",
    "message": "New Dump Data is Inserted",
    "data": {
        "title": "Typescript error",
        "link": "https://javascript.info/custom-errors",
        "tag": "education",
        "image": "https://img.logo.dev/javascript.info?token=pk_PCz2SULwSFWmMvaP_SIfXg&size=150&format=png",
        "_id": "67003c927c84ab4b1b3cee25",
        "createdAt": "2024-10-04T19:05:54.817Z",
        "updatedAt": "2024-10-04T19:05:54.817Z",
        "__v": 0
    }
*/
export interface IResponse {
  message: string;
  status: string;
  data: object;
}
export async function createBookmark(post: {
  [k: string]: FormDataEntryValue;
}) {
  console.log(post);
  const post1 = {
    title: post.title,
    link: post.link,
    tag: post.tag,
  };
  const url = `${server}/api/create-bookmark`;
  // console.log(JSON.stringify(post));
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(post1),
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  // console.log(res);
  if (!res.ok) {
    const info = await res.json();
    const error = new APIError(
      "An error occurred while fetching the events",
      res.status,
      info
    );
    throw error;
  }
  const { data }: { data: IResponse } = await res.json();
  console.log(data);

  return data;
}

export async function updateBookmark(post: {
  [k: string]: FormDataEntryValue;
}) {
  console.log(post);

  const url = `${server}/api/update-bookmark`;
  // console.log(JSON.stringify(post));
  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(post),
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  // console.log(res);
  if (!res.ok) {
    const info = await res.json();
    const error = new APIError(
      "An error occurred while fetching the events",
      res.status,
      info
    );
    throw error;
  }
  const data = await res.json();
  console.log(data);

  return data;
}
export async function getBookMark(bookmarkID: string) {
  console.log(bookmarkID);
  const url = `${server}/api/get-bookmark/${bookmarkID}`;
  // console.log(JSON.stringify(post));
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  // console.log(res);
  if (!res.ok) {
    const info = await res.json();
    const error = new APIError(
      "An error occurred while fetching the events",
      res.status,
      info
    );
    throw error;
  }
  const { data } = await res.json();
  console.log(data);
  return data;
}
export async function getAllBookmark() {
  const url = `${server}/api/get-all-bookmark`;
  // console.log(JSON.stringify(post));
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  // console.log(res);
  if (!res.ok) {
    const info = await res.json();
    const error = new APIError(
      "An error occurred while fetching the events",
      res.status,
      info
    );
    throw error;
  }
  const { data } = await res.json();
  console.log(data);
  return data;
}
export async function getMyProfile() {
  const url = `${server}/api/get-my-profile`;
  // console.log(JSON.stringify(post));
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  // console.log(res);
  if (!res.ok) {
    const info = await res.json();
    const error = new APIError(
      "An error occurred while fetching the events",
      res.status,
      info
    );
    throw error;
  }
  const { data } = await res.json();
  console.log(data);
  return data;
}

export async function deleteBookmark(bookmarkID: string) {
  console.log(bookmarkID);
  const url = `${server}/api/delete-bookmark/${bookmarkID}`;
  // console.log(JSON.stringify(post));
  const res = await fetch(url, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  // console.log(res);
  if (!res.ok) {
    const info = await res.json();
    const error = new APIError(
      "An error occurred while fetching the events",
      res.status,
      info
    );
    throw error;
  }
  const data = await res.json();
  console.log(data);
  return data;
}
