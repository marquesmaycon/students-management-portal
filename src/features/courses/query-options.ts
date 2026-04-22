import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

import type { NextParam } from "@/lib/firebase";

import { studentListOptions } from "../students/query-options";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  listCourses,
  updateCourse,
} from "./service";
import type { CourseSchema } from "./validation";

const key = "courses" as const;

export const courseListOptions = (search?: string) =>
  infiniteQueryOptions({
    queryKey: [key, search],
    queryFn: ({ pageParam }: { pageParam: NextParam }) =>
      listCourses(pageParam, search),
    initialPageParam: null,
    getNextPageParam: (lp) => lp.nextCursor,
  });

export const courseByIdOptions = (id?: string) =>
  queryOptions({
    queryKey: [key, id],
    queryFn: () => getCourseById(id!),
    enabled: !!id,
  });

export const createCourseOptions = mutationOptions({
  mutationFn: createCourse,
  onSuccess: () => {
    toast.success("Curso criado com sucesso!");
  },
  onError: () => {
    toast.error("Erro ao criar curso. Tente novamente.");
  },
  onSettled: (_, __, ___, ____, { client }) => {
    client.invalidateQueries(courseListOptions());
  },
});

export const updateCourseOptions = (id?: string) =>
  mutationOptions({
    mutationFn: (data: CourseSchema) => updateCourse(id!, data),
    onSuccess: () => {
      toast.success("Curso atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar curso. Tente novamente.");
    },
    onSettled: (_, __, ___, ____, { client }) => {
      client.invalidateQueries(courseListOptions());
      client.invalidateQueries(studentListOptions());
    },
  });

export const deleteCourseOptions = mutationOptions({
  mutationFn: deleteCourse,
  onMutate: async (id, { client }) => {
    await client.cancelQueries(courseListOptions());

    const previousCourses = client.getQueryData(courseListOptions().queryKey);

    client.setQueryData(courseListOptions().queryKey, (old) => {
      if (!old) return old;
      return {
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          data: page.data.filter((u) => u.id !== id),
        })),
      };
    });

    return { previousCourses };
  },
  onSuccess: () => {
    toast.success("Curso excluído com sucesso!");
  },
  onError: (err, __, context, { client }) => {
    toast.error("Erro ao excluir curso. Tente novamente.", {
      description: err.message,
    });
    client.setQueryData(
      courseListOptions().queryKey,
      () => context?.previousCourses,
    );
  },
  onSettled: (_, __, ___, ____, { client }) => {
    client.invalidateQueries(courseListOptions());
    client.invalidateQueries(studentListOptions());
  },
});
