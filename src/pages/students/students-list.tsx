import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { ChevronDown, Eye, Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router";

import { DestroyButton } from "@/components/form/destroy-button";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import { cn } from "@/lib/utils";

export default function StudentsList() {
  const {
    data: students,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(studentListOptions);
  const { mutateAsync: destroy } = useMutation(deleteStudentOptions);

  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between">
        <h1 className="font-heading">Lista de Alunos</h1>
        <Button asChild>
          <Link to="/students/new">
            Novo Aluno <Plus />
          </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && (
            <>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-7" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-7" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-7" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-7" />
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-7 w-20 rounded-md" />
                      <Skeleton className="h-7 w-8 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
          {students?.pages.map((group, index) => (
            <React.Fragment key={index}>
              {group.data.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.courseName}</TableCell>
                  <TableCell>
                    {student.createdAt.toDate().toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="flex items-center justify-end space-x-2 text-right">
                    <Button asChild size="sm">
                      <Link to={`/students/${student.id}`}>
                        Visualizar <Eye />
                      </Link>
                    </Button>
                    <DestroyButton
                      size="icon-sm"
                      title="Excluir aluno"
                      label=" "
                      destroy={() => destroy(student.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
        <TableCaption>Lista de todos os alunos</TableCaption>
      </Table>
      <div className="rise-in mt-8 flex">
        <Button
          onClick={() => fetchNextPage()}
          className="mx-auto"
          loading={isFetchingNextPage || isLoading}
          disabled={!hasNextPage}
          variant="outline"
        >
          {hasNextPage ? "Load more " : "Nothing more to load"}
          <ChevronDown className={cn(!hasNextPage && "hidden")} />
        </Button>
      </div>
    </div>
  );
}
