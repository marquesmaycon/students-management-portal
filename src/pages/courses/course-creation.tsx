import { CourseForm } from "@/features/courses/course-form";

export default function CourseCreation() {
  return (
    <div className="page-wrapper">
      <div className="p-4">
        <h1 className="font-serif text-4xl font-bold">Novo Curso</h1>
      </div>
      <CourseForm />
    </div>
  );
}
