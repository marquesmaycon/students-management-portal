import { Timestamp } from "firebase/firestore";
import z from "zod";

export const courseSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  createdAt: z.instanceof(Timestamp),
});

export const coursetWithIdSchema = courseSchema.extend({
  id: z.string(),
});

export type Course = z.infer<typeof coursetWithIdSchema>;
export type CourseSchema = z.infer<typeof courseSchema>;
