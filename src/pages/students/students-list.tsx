import { useMutation, useQuery } from "@tanstack/react-query";
import { Eye, Plus } from "lucide-react";
import { Link } from "react-router";

import { DestroyButton } from "@/components/form/destroy-button";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteStudentOptions,
  studentListOptions,
} from "@/features/students/query-options";

export default function StudentsList() {
  const { data: students } = useQuery(studentListOptions);
  const { mutateAsync: destroy } = useMutation(deleteStudentOptions);

  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between p-4">
        <h1 className="font-serif text-4xl font-bold">Lista de Alunos</h1>
        <Button asChild>
          <Link to="/students/new">
            Novo Aluno <Plus />
          </Link>
        </Button>
      </div>
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>
                  {student.createdAt.toDate().toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button asChild size="xs">
                    <Link to={`/students/${student.id}`}>
                      Visualizar <Eye />
                    </Link>
                  </Button>
                  <DestroyButton
                    title="Excluir aluno"
                    destroy={() => destroy(student.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>Lista de todos os alunos</TableCaption>
        </Table>
      </div>
    </div>
  );
}
