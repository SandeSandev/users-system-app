import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { Layout } from "../components/Layout/Layout";

const Users = lazy(() => import("../pages/Users/Users"));
const Posts = lazy(() => import("../pages/Posts/Posts"));
const Tasks = lazy(() => import("../pages/Tasks/Tasks"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="users" replace />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "posts/:userId",
        element: <Posts />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
    ],
  },
]);