import { CourseForm } from "@/features/courses/course-form";

export default function CourseCreation() {
  return (
    <div className="page-wrapper">
      <div className="p-4">
        <h1 className="font-heading">Novo Curso</h1>
      </div>
      <CourseForm />
    </div>
  );
}
