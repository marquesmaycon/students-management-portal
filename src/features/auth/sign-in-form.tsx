import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LogIn } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

import { createInputField } from "@/components/form/input-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";

import { signInOptions } from "./query-options";
import { type SignInSchema, signInSchema } from "./validation";

const SignInInput = createInputField<SignInSchema>();

export function SignInForm() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signInAsync, isPending } = useMutation(signInOptions);

  async function onSubmit(data: SignInSchema) {
    await signInAsync(data);
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Entre na sua conta</CardTitle>
            <CardDescription>
              Insira suas credenciais para acessar o painel de controle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <SignInInput
                  name="email"
                  label="Email"
                  placeholder="m@example.com"
                />
                <SignInInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="*******"
                />
                <Field>
                  <Button type="submit" loading={isPending}>
                    Login
                    <LogIn />
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
}
