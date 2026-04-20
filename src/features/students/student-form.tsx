import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, RotateCcw, Save } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { createStudentOptions, updateStudentOptions } from "./query-options";
import { type Student, type StudentSchema, studentSchema } from "./validation";

export function StudentForm({ defaultValues }: { defaultValues?: Student }) {
  const nav = useNavigate();

  const form = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      course: "",
    },
  });

  const { mutateAsync: create, isPending: isCreating } =
    useMutation(createStudentOptions);
  const { mutateAsync: update, isPending: isUpdating } = useMutation(
    updateStudentOptions(defaultValues?.id),
  );

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
      nav("/students");
    }
  }

  const isMutating = isCreating || isUpdating;

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

      <div className="mt-auto flex w-full items-center justify-between gap-2">
        <Button type="button" variant="outline" asChild>
          <Link to="/students">
            Voltar <ArrowLeft />
          </Link>
        </Button>

        <Button type="button" variant="secondary" onClick={() => form.reset()}>
          Resetar <RotateCcw />
        </Button>

        <Button type="submit" className="ml-auto" loading={isMutating}>
          Salvar <Save />
        </Button>
      </div>
    </form>
  );
}
