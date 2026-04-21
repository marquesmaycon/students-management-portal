import { createBrowserRouter } from "react-router";

import { AuthLayout } from "./components/layout/auth/auth-layout";
import { DashboardLayout } from "./components/layout/dashboard/dashboard-layout";
import { SignInForm } from "./features/auth/sign-in-form";
import { courseByIdOptions } from "./features/courses/query-options";
import { studentByIdOptions } from "./features/students/query-options";
import { queryClient } from "./lib/tanstack-query";
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
    Component: DashboardLayout,
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
        loader: async ({ params }) => {
          const { id } = params;
          const { name } = await queryClient.fetchQuery(studentByIdOptions(id));
          return name;
        },
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
        loader: async ({ params }) => {
          const { id } = params;
          const { name } = await queryClient.fetchQuery(courseByIdOptions(id));
          return name;
        },
      },
      {
        path: "/courses/new",
        Component: CourseCreation,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: SignInForm,
      },
    ],
  },
]);
