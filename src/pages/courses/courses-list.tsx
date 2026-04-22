import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { ChevronDown, Eye, Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

import { DestroyButton } from "@/components/form/destroy-button";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

export default function CoursesList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 800);

  const {
    data: courses,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(courseListOptions(debouncedSearch));

  const { mutateAsync: destroy } = useMutation(deleteCourseOptions);

  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between">
        <h1 className="font-heading">Lista de Cursos</h1>
        <Button asChild>
          <Link to="/courses/new">
            Novo Curso <Plus />
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <FieldLabel htmlFor="search">Pesquisa por nome</FieldLabel>
        <Input
          id="search"
          className="w-fit"
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Nome</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses?.pages.map((group, index) => (
            <React.Fragment key={index}>
              {group.data.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>
                    {course.createdAt.toDate().toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="flex items-center justify-end space-x-2 text-right">
                    <Button asChild size="sm">
                      <Link to={`/courses/${course.id}`}>
                        Visualizar <Eye />
                      </Link>
                    </Button>
                    <DestroyButton
                      size="icon-sm"
                      destroy={() => destroy(course.id)}
                      title="Excluir curso"
                      label=" "
                    />
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
        <TableCaption>Lista de todos os cursos</TableCaption>
      </Table>
      <div className="mt-8 flex">
        <Button
          onClick={() => fetchNextPage()}
          className="mx-auto"
          loading={isFetchingNextPage || isLoading}
          disabled={!hasNextPage}
          variant="outline"
        >
          {hasNextPage ? "Carregar mais" : "Nada mais a mostrar"}
          <ChevronDown className={cn(!hasNextPage && "hidden")} />
        </Button>
      </div>
    </div>
  );
}
