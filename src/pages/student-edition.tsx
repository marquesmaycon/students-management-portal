import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { getStudentById } from "@/features/students/service";
import { StudentForm } from "@/features/students/student-form";

export default function StudentEdition() {
  const { id } = useParams<{ id: string }>();

  const { data: student } = useQuery({
    queryKey: ["students", id],
    queryFn: () => getStudentById(id!),
    enabled: !!id,
  });

  return (
    <div className="page-wrapper">
      <div className="p-4">
        <h1>
          <span className="text-sm">Aluno:</span>{" "}
          <span className="font-serif text-4xl font-bold">{student?.name}</span>
        </h1>
      </div>
      <StudentForm defaultValues={student} />
    </div>
  );
}
