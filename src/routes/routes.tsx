import { createBrowserRouter, Navigate } from "react-router-dom";
import Tasks from "../pages/Tasks/Tasks";
import { Layout } from "../components/Layout/Layout";
import Users from "../pages/Users/Users";
import Posts from "../pages/Posts/Posts";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/users" replace />,
      },
      {
        path: "users",
        element: <Users />,
      },
      { path: "posts/:userId", element: <Posts /> },
      { path: "tasks", element: <Tasks /> },
    ],
  },
]);
