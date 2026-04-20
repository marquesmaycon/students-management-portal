import { createBrowserRouter } from "react-router";

import { Layout } from "./components/layout/layout";
import Home from "./pages/home";
import StudentCreation from "./pages/student-creation";
import StudentEdition from "./pages/student-edition";
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
      {
        path: "/students/:id",
        Component: StudentEdition,
      },
      {
        path: "/students/new",
        Component: StudentCreation,
      },
    ],
  },
]);
