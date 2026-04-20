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
  courseListOptions,
  deleteCourseOptions,
} from "@/features/courses/query-options";

export default function CoursesList() {
  const { data: courses } = useQuery(courseListOptions);
  const { mutateAsync: destroy } = useMutation(deleteCourseOptions);

  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between p-4">
        <h1 className="font-serif text-4xl font-bold">Lista de Cursos</h1>
        <Button asChild>
          <Link to="/courses/new">
            Novo Curso <Plus />
          </Link>
        </Button>
      </div>
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses?.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.name}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button asChild size="xs">
                    <Link to={`/courses/${course.id}`}>
                      Visualizar <Eye />
                    </Link>
                  </Button>
                  <DestroyButton
                    destroy={() => destroy(course.id)}
                    title="Excluir curso"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>Lista de todos os cursos</TableCaption>
        </Table>
      </div>
    </div>
  );
}
