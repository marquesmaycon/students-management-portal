import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, RotateCcw, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { createInputField } from "@/components/form/input-field";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

import { createStudentOptions, updateStudentOptions } from "./query-options";
import { type Student, type StudentSchema, studentSchema } from "./validation";

const StudentInput = createInputField<StudentSchema>();

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
        <StudentInput name="name" label="Nome" placeholder="José da Silva" />
        <StudentInput
          name="email"
          label="E-mail"
          placeholder="jose.silva@example.com"
        />
        <StudentInput name="age" label="Idade" placeholder="25" type="number" />
        <StudentInput
          name="course"
          label="Curso"
          placeholder="Ciência da Computação"
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
