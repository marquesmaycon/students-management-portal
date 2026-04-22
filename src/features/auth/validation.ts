import z from "zod";

export const signInSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
