import { Timestamp } from "firebase/firestore";
import z from "zod";

import { formatNameBR } from "@/lib/utils";

export const courseSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").transform(formatNameBR),
});

export const coursetWithIdSchema = courseSchema.extend({
  id: z.string(),
  createdAt: z.instanceof(Timestamp),
});

export type Course = z.infer<typeof coursetWithIdSchema>;
export type CourseSchema = z.infer<typeof courseSchema>;
