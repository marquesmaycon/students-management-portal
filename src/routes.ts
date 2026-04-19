import { createBrowserRouter } from "react-router";

import Home from "./pages/home";
import StudentList from "./pages/student-list";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/students",
    Component: StudentList,
  },
]);
