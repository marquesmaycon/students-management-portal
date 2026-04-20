import z from "zod";

export const signInSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(2, "O nome deve conter no mínimo 2 caracteres"),
    email: z.email("E-mail inválido"),
    password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
    passwordConfirmation: z
      .string()
      .min(6, "A confirmação de senha deve conter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
  });

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
