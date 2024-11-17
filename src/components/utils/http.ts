import { QueryClient } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";
import { IRemaindar } from "../EditBookMark/UpdateBookmark";
import toast from "react-hot-toast";
import { APIError, CustomErrorMessage, ErrorResponse, getCallMethod } from "./authUtils";
export const queryclient = new QueryClient();
const server = import.meta.env.VITE_SERVER_URL;
export interface IBookMark extends Document {
  title: string;
  link: string;
  description?: string;
  tag: string;
  topics?: string; // presently i perfer to go with optional
  image?: string;
}
export interface IResponse {
  message: string;
  status: string;
  data: object;
}
export async function createBookmark(post: {
  [k: string]: FormDataEntryValue;
}) {
  let filterData = post;
  if (post?.calendar && typeof post.calendar === 'string') {
    const filteredCalendar = JSON.parse(post.calendar);
    filterData.calendar = filteredCalendar
  } else {
    console.error('post.calendar is not a string');
  }
  const url = `${server}/api/create-bookmark`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(filterData),
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!res.ok) {
    await ErrorResponse(res);
  }
  const { data }: { data: IResponse } = await res.json();

  return data;
}

export async function updateBookmark(post: {
  [k: string]: FormDataEntryValue;
}) {
  let filterData = post;
  if (post?.calendar && typeof post.calendar === 'string') {
    const filteredCalendar = JSON.parse(post.calendar);
    filterData.calendar = filteredCalendar
  } else {
    console.error('post.calendar is not a string');
  }
  const url = `${server}/api/update-bookmark`;
  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(filterData),
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!res.ok) {
    await ErrorResponse(res);
  }
  const data = await res.json();

  return data;
}
export async function getBookMark(bookmarkID: string) {
  const url = `${server}/api/get-bookmark/${bookmarkID}`;
  const res = await getCallMethod(url);
  if (!res.ok) {
    await ErrorResponse(res);
  }
  const { data } = await res.json();
  return data;
}
export async function getAllBookmark() {
  const url = `${server}/api/get-all-bookmark`;
  const res = await getCallMethod(url);
  if (!res.ok) {
    await ErrorResponse(res);
  }
  const { data } = await res.json();
  return data;
}
export async function getMyProfile(navigate: NavigateFunction) {
  const url = `${server}/api/get-my-profile`;
  const res = await getCallMethod(url);
  if(!res.ok){
    await CustomErrorMessage(res,undefined, navigate, '/home');
  }
  const { data } = await res.json();
  // navigate('/')
  return data;
}
export async function getBookMarkByTopic(post: string) {
  const url = `${server}/api/get-bookmark-by-topics`;
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ topics: post }),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!res.ok) {
    await ErrorResponse(res);
  }
  const { data } = await res.json();
  return data;
}
interface IOrder {
  _id: string;
  [x: string]: string | number;
}
export async function saveBookmarkOrder(reorderedData: IOrder[]) {
  const url = `${server}/api/save-order`;
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ updatedOrder: reorderedData }),
  });

  if (!res.ok) {
    await ErrorResponse(res);
  }
  const data = await res.json();
  return data;
}

export async function generateTagAndDescription(post: string) {
  const url = `${server}/ai/get-tags-summary-gemini`;
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: post }),
  });

  if (!res.ok) {
    await ErrorResponse(res);
  }
  const { data } = await res.json();
  return data;
}

export async function getBookmarkFromSearch(post: {
  [k: string]: FormDataEntryValue;
}) {
  const url = `${server}/api/search-bookmark`;
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!res.ok) {
    await ErrorResponse(res);
  }
  const { data } = await res.json();
  return data;
}

export async function logout(navigate: NavigateFunction) {
  const url = `${server}/api/logout`;
  const res = await getCallMethod(url);
  if (!res.ok) {
    await ErrorResponse(res);
  }
  await res.json();
  navigate("/login");
}

export async function deleteBookmark(bookmarkID: string) {
  const url = `${server}/api/delete-bookmark/${bookmarkID}`;
  const res = await fetch(url, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!res.ok) {
    await ErrorResponse(res);
  }
  const data = await res.json();
  return data;
}
export async function deleteAllBookmarkByTopics(topics: string) {
  const url = `${server}/api/delete-bookmark-by-topics`;
  const res = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify({ topics }),
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!res.ok) {
    await ErrorResponse(res);
  }
  const data = await res.json();
  return data;
}

export async function uploadImageToCloud(post: FormData) {
  const url = `${server}/api/upload-image-to-cloud`;
  const res = await fetch(url, {
    method: "POST",
    body: post,
    credentials: "include",
  });
  if (!res.ok) {
    await ErrorResponse(res);
  }
  const { data } = await res.json();
  return data;
}

export async function addRemainder(post :  IRemaindar) {
  const url = `${server}/api/calendar`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(post),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    const info = await res.json();
    if(info.message.includes("No access, refresh token")){
      window.open(`${server}/auth/google`, "_self")
    }
    const error = new APIError(
      info.message,
      res.status,
      info
    );
    throw error;
  }
  const { data } = await res.json();
  return data;
}
export async function updateRemainder(post :  IRemaindar) {
  const url = `${server}/api/calendar/edit`;
  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(post),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    const info = await res.json();
    if(info.message.includes("No access, refresh token")){
      toast.error("Redirecting for authentication")
      window.open(`${server}/auth/google`, "_self")
    }
    const error = new APIError(
      info.message,
      res.status,
      info
    );
    throw error;
  }
  const { data } = await res.json();
  return data;
}
export async function deleteRemainder(post :  {eventId: string, bookmarkId: string}) {
  const url = `${server}/api/calendar/delete`;
  const res = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(post),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    const info = await res.json();
    toast.error("Redirecting for authentication");
    if(info.message.includes("No access, refresh token")){
      window.open(`${server}/auth/google`, "_self")
    }
    
    const error = new APIError(
      "An error occurred while fetching the events",
      res.status,
      info
    );
    throw error;
  }
  const { data } = await res.json();
  return data;
}
export async function uploadBookmarkFile(post: FormData) {
  const url = `${server}/api/upload-all-chrome-bookmark`;
  const res = await fetch(url, {
    method: "POST",
    body: post,
    credentials: "include",
  });
  if (!res.ok) {
    await ErrorResponse(res);
  }
  const data = await res.json();
  return data;
}