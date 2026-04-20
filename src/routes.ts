import { createBrowserRouter } from "react-router";

import { Layout } from "./components/layout/layout";
import Home from "./pages/home";
import StudentList from "./pages/student-list";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/students",
        Component: StudentList,
      },
    ],
  },
]);
