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
      element: <AllBookMark />,
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
      element: <CreateBookmark />,
    },
    {
      path: "/edit/:bookmarkID",
      element: <UpdateBookmark />,
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryclient}>
        <UserProfileData>
          <RouterProvider router={router} />
        </UserProfileData>
      </QueryClientProvider>
    </>
  );
}

export default App;
