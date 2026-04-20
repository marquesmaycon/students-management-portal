import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, RotateCcw, Save } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { createInputField } from "@/components/form/input-field";
import { createSelectField } from "@/components/form/select-field";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

import { courseListOptions } from "../courses/query-options";
import { createStudentOptions, updateStudentOptions } from "./query-options";
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

  const isMutating = isCreating || isUpdating;

  return (
    <FormProvider {...form}>
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

        <div className="mt-auto flex w-full items-center justify-between gap-2">
          <Button type="button" variant="outline" asChild>
            <Link to="/students">
              Voltar <ArrowLeft />
            </Link>
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => form.reset()}
          >
            Resetar <RotateCcw />
          </Button>

          <Button type="submit" className="ml-auto" loading={isMutating}>
            Salvar <Save />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
