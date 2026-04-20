import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Save } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { createStudent, updateStudent } from "./service";
import { type Student, type StudentSchema, studentSchema } from "./validation";

export function StudentForm({ defaultValues }: { defaultValues?: Student }) {
  const form = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      course: "",
    },
  });

  const { mutateAsync: create } = useMutation({
    mutationFn: createStudent,
  });
  const { mutateAsync: update } = useMutation({
    mutationFn: async (data: StudentSchema) =>
      await updateStudent(defaultValues!.id, data),
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  async function onSubmit(data: StudentSchema) {
    if (defaultValues) {
      await update(data);
    } else {
      await create(data);
    }
  }

  return (
    <form
      id="student-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-full flex-col space-y-12 p-4"
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="José da Silva"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="jose.silva@example.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="age"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="age">Idade</FieldLabel>
              <Input
                {...field}
                id="age"
                aria-invalid={fieldState.invalid}
                placeholder="25"
                type="number"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="course"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="course">Curso</FieldLabel>
              <Input
                {...field}
                id="course"
                aria-invalid={fieldState.invalid}
                placeholder="Ciência da Computação"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-auto flex w-full justify-between gap-2">
        <Button type="button" variant="outline">
          Voltar <ArrowLeft />
        </Button>
        <div className="space-x-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Resetar
          </Button>
          <Button type="submit">
            Salvar <Save />
          </Button>
        </div>
      </div>
    </form>
  );
}
