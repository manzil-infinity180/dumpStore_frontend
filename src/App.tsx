import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import AllBookMark from "./components/AllBookMark";
import Login from "./components/Auth/Login";
import UpdateBookmark from "./components/EditBookMark/UpdateBookmark";
import CreateBookmark from "./components/EditBookMark/CreateBookmark";
import SignUp from "./components/Auth/SignUp";
import { queryclient } from "./components/utils/http";
import { UserProfileData } from "./components/utils/useProfileData";
import { ToasterHelper } from "./components/ui/ToasterHelper";
import UploadBookmarFile from "./components/ui/UploadBookmarkFile";
import LandingPage from "./components/ui/LandingPage";
function App() {
  const router = createBrowserRouter([
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
      path: "/upload/bookmark",
      element: <UploadBookmarFile />,
    },
    {
      path: "/home",
      element: <LandingPage />
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryclient}>
        <RouterProvider router={router} />
        <ToasterHelper />
      </QueryClientProvider>
    </>
  );
}

export default App;
