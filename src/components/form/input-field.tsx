import type { ComponentProps } from "react";
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type InputFieldProps<T extends FieldValues> = ComponentProps<typeof Input> & {
  name: Path<T>;
  label: string;
};

export function InputField<T extends FieldValues>({
  name,
  label,
  ...props
}: InputFieldProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <Input
            {...field}
            {...props}
            id={name}
            aria-invalid={fieldState.invalid}
          />

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export const createInputField = <T extends FieldValues>() => {
  return (props: InputFieldProps<T>) => <InputField<T> {...props} />;
};
