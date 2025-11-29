import { createBrowserRouter } from "react-router-dom";
import Users from "../pages/Users";
import Posts from "../pages/Posts";
import Tasks from "../pages/Tasks";
import { Layout } from "../components/Layout/Layout";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      { path: "posts", element: <Posts /> },
      { path: "tasks", element: <Tasks /> },
    ],
  },
]);
