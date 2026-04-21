import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { FormActions } from "@/components/form/form-actions";
import { createInputField } from "@/components/form/input-field";
import { createSelectField } from "@/components/form/select-field";
import { FieldGroup } from "@/components/ui/field";

import { courseListOptions } from "../courses/query-options";
import {
  createStudentOptions,
  deleteStudentOptions,
  updateStudentOptions,
} from "./query-options";
import { type Student, type StudentSchema, studentSchema } from "./validation";

const StudentInput = createInputField<StudentSchema>();
const StudentSelect = createSelectField<StudentSchema>();

export function StudentForm({ defaultValues }: { defaultValues?: Student }) {
  const nav = useNavigate();

  const form = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      courseId: "",
      courseName: "",
    },
  });

  const { data: courses } = useQuery(courseListOptions);

  const { mutateAsync: create, isPending: isCreating } =
    useMutation(createStudentOptions);
  const { mutateAsync: update, isPending: isUpdating } = useMutation(
    updateStudentOptions(defaultValues?.id),
  );
  const { mutateAsync: destroy, isPending: isDestroying } = useMutation({
    ...deleteStudentOptions,
    onSuccess: () => {
      toast.success("Aluno excluído com sucesso!");
      nav("/students");
    },
  });

  const selectedCourseId = useWatch({
    control: form.control,
    name: "courseId",
  });

  useEffect(() => {
    if (!selectedCourseId || !courses) return;

    const selectedCourse = courses.find((c) => c.id === selectedCourseId);

    if (selectedCourse) {
      form.setValue("courseName", selectedCourse.name);
    }
  }, [selectedCourseId, courses, form]);

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

  const isMutating = isCreating || isUpdating || isDestroying;

  return (
    <FormProvider {...form}>
      <form
        id="student-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col space-y-12"
      >
        <FieldGroup>
          <StudentInput name="name" label="Nome" placeholder="José da Silva" />
          <StudentInput
            name="email"
            label="E-mail"
            placeholder="jose.silva@example.com"
          />
          <StudentInput
            name="age"
            label="Idade"
            placeholder="25"
            type="number"
          />
          <StudentSelect
            name="courseId"
            label="Curso"
            placeholder="Selecione um curso"
            options={courses?.map(({ id, name }) => ({
              value: id,
              label: name,
            }))}
          />
        </FieldGroup>

        <FormActions
          backLink="/students"
          isMutating={isMutating}
          destroy={defaultValues ? () => destroy(defaultValues.id) : undefined}
        />
      </form>
    </FormProvider>
  );
}
