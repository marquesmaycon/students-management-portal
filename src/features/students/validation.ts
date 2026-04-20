import { Timestamp } from "firebase/firestore";
import z from "zod";

export const studentSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.email(),
  age: z.coerce
    .number<number>("A idade deve ser um número")
    .int("A idade deve ser um número inteiro")
    .min(18, "A idade deve ser pelo menos 18")
    .max(100, "A idade não pode ser maior que 100"),
  courseId: z.string().min(1, "O curso é obrigatório"),
  courseName: z.string().min(1, "O curso é obrigatório"),
});

export const studentWithIdSchema = studentSchema.extend({
  id: z.string(),
  createdAt: z.instanceof(Timestamp),
});

export type Student = z.infer<typeof studentWithIdSchema>;
export type StudentSchema = z.infer<typeof studentSchema>;
