import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, RotateCcw, Save } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { createInputField } from "@/components/form/input-field";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

import { createCourseOptions, updateCourseOptions } from "./query-options";
import { type Course, type CourseSchema, courseSchema } from "./validation";

const CourseInput = createInputField<CourseSchema>();

export function CourseForm({ defaultValues }: { defaultValues?: Course }) {
  const nav = useNavigate();

  const form = useForm<CourseSchema>({
    resolver: zodResolver(courseSchema),
    defaultValues: { name: "" },
  });

  const { mutateAsync: create, isPending: isCreating } =
    useMutation(createCourseOptions);
  const { mutateAsync: update, isPending: isUpdating } = useMutation(
    updateCourseOptions(defaultValues?.id),
  );

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  async function onSubmit(data: CourseSchema) {
    if (defaultValues) {
      await update(data);
    } else {
      await create(data);
      nav("/courses");
    }
  }

  const isMutating = isCreating || isUpdating;

  return (
    <FormProvider {...form}>
      <form
        id="course-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col space-y-12 p-4"
      >
        <FieldGroup>
          <CourseInput name="name" label="Nome" />
        </FieldGroup>

        <div className="mt-auto flex w-full items-center justify-between gap-2">
          <Button type="button" variant="outline" asChild>
            <Link to="/courses">
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
