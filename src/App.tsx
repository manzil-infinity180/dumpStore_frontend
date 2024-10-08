import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import { QueryClientProvider } from "@tanstack/react-query";
import Demo from "./components/Demo";
import AllBookMark from "./components/AllBookMark";
import Login from "./components/Auth/Login";
import UpdateBookmark from "./components/EditBookMark/UpdateBookmark";
import CreateBookmark from "./components/EditBookMark/CreateBookmark";
import SignUp from "./components/Auth/SignUp";
import { queryclient } from "./components/utils/http";
import { UserProfileData } from "./components/utils/useProfileData";
import Loader from "./components/utils/Loader";
import TopicsCard from "./components/ui/TopicsCard";
import SearchField from "./components/ui/SearchField";
function App() {
  const router = createBrowserRouter([
    // {
    //   path: "*",
    //   element: <Home />,
    // },
    {
      path: "/demo",
      element: <Demo />,
    },
    {
      path: "*",
      element: (
        <UserProfileData>
          <AllBookMark />
        </UserProfileData>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/create",
      element: (
        <UserProfileData>
          <CreateBookmark />
        </UserProfileData>
      ),
    },
    {
      path: "/edit/:bookmarkID",
      element: (
        <UserProfileData>
          <UpdateBookmark />
        </UserProfileData>
      ),
    },
    {
      path: "/search",
      element: <SearchField />,
    },
    // {
    //   path: "/topics",
    //   element: <TopicsCard />,
    // },
  ]);
  return (
    <>
      <QueryClientProvider client={queryclient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
