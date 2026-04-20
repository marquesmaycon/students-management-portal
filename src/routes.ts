import { createBrowserRouter } from "react-router";

import { Layout } from "./components/layout/layout";
import CourseCreation from "./pages/courses/course-creation";
import CourseView from "./pages/courses/course-view";
import CoursesList from "./pages/courses/courses-list";
import Home from "./pages/home";
import StudentCreation from "./pages/students/student-creation";
import StudentView from "./pages/students/student-view";
import StudentsList from "./pages/students/students-list";

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
        Component: StudentsList,
      },
      {
        path: "/students/:id",
        Component: StudentView,
      },
      {
        path: "/students/new",
        Component: StudentCreation,
      },
      {
        path: "/courses",
        Component: CoursesList,
      },
      {
        path: "/courses/:id",
        Component: CourseView,
      },
      {
        path: "/courses/new",
        Component: CourseCreation,
      },
    ],
  },
]);
