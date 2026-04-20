import { StudentForm } from "@/features/students/student-form";

export default function StudentCreation() {
  return (
    <div className="page-wrapper">
      <div className="p-4">
        <h1 className="font-serif text-4xl font-bold">Novo Aluno</h1>
      </div>
      <StudentForm />
    </div>
  );
}
