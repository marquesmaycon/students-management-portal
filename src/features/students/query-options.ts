import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createStudent,
  deleteStudent,
  getStudentById,
  listStudents,
  updateStudent,
} from "./service";
import type { StudentSchema } from "./validation";

const key = "students" as const;

export const studentListOptions = queryOptions({
  queryKey: [key],
  queryFn: listStudents,
});

export const studentByIdOptions = (id?: string) =>
  queryOptions({
    queryKey: [key, id],
    queryFn: () => getStudentById(id!),
    enabled: !!id,
  });

export const createStudentOptions = mutationOptions({
  mutationFn: createStudent,
  onSuccess: () => {
    toast.success("Aluno criado com sucesso!");
  },
  onError: () => {
    toast.error("Erro ao criar aluno. Tente novamente.");
  },
  onSettled: (_, __, ___, ____, { client }) => {
    client.invalidateQueries(studentListOptions);
  },
});

export const updateStudentOptions = (id?: string) =>
  mutationOptions({
    mutationFn: (data: StudentSchema) => updateStudent(id!, data),
    onSuccess: () => {
      toast.success("Aluno atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar aluno. Tente novamente.");
    },
    onSettled: (_, __, ___, ____, { client }) => {
      client.invalidateQueries(studentListOptions);
    },
  });

export const deleteStudentOptions = mutationOptions({
  mutationFn: deleteStudent,
  onMutate: async (id, { client }) => {
    await client.cancelQueries(studentListOptions);

    const previousStudents = client.getQueryData(studentListOptions.queryKey);

    client.setQueryData(studentListOptions.queryKey, (old) => {
      if (!old) return old;
      return old.filter((u) => u.id !== id);
    });

    return { previousStudents };
  },

  onSuccess: () => {
    toast.success("Aluno excluído com sucesso!");
  },
  onError: (err, __, context, { client }) => {
    toast.error("Erro ao excluir aluno. Tente novamente.", {
      description: err.message,
    });
    client.setQueryData(
      studentListOptions.queryKey,
      () => context?.previousStudents,
    );
  },
  onSettled: (_, __, ___, ____, { client }) => {
    client.invalidateQueries(studentListOptions);
  },
});
