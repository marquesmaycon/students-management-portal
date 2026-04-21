import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { CourseForm } from "@/features/courses/course-form";
import { courseByIdOptions } from "@/features/courses/query-options";

export default function CourseView() {
  const { id } = useParams<{ id: string }>();

  const { data: course } = useQuery(courseByIdOptions(id));

  return (
    <div className="page-wrapper">
      <div className="p-4">
        <h1 className="font-heading">
          <span className="font-thin">Curso:</span> {course?.name}
        </h1>
      </div>
      <CourseForm defaultValues={course} />
    </div>
  );
}
