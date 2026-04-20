import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Link } from "react-router";

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
import { deleteStudent, listStudents } from "@/features/students/service";

export default function StudentList() {
  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: listStudents,
  });

  const { mutateAsync: destroy } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: (_, __, ___, { client }) => {
      client.invalidateQueries({ queryKey: ["students"] });
    },
  });

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
          <TableCaption>Lista de todos os alunos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead className="text-right">Curso</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.map((student) => (
              <TableRow>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell className="text-right">{student.course}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button asChild>
                    <Link to={`/students/${student.id}`}>Visualizar</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => destroy(student.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
