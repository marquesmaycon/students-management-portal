import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { FormActions } from "@/components/form/form-actions";
import { createInputField } from "@/components/form/input-field";
import { FieldGroup } from "@/components/ui/field";

import {
  createCourseOptions,
  deleteCourseOptions,
  updateCourseOptions,
} from "./query-options";
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
  const { mutateAsync: destroy, isPending: isDestroying } = useMutation({
    ...deleteCourseOptions,
    onSuccess: () => {
      toast.success("Curso excluído com sucesso!");
      nav("/courses");
    },
  });

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

  const isMutating = isCreating || isUpdating || isDestroying;

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

        <FormActions
          backLink="/courses"
          isMutating={isMutating}
          destroy={defaultValues ? () => destroy(defaultValues.id) : undefined}
        />
      </form>
    </FormProvider>
  );
}
