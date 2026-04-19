import z from "zod";

export const studentSchema = z.object({
  name: z.string(),
  age: z.number(),
  course: z.string(),
  email: z.email(),
});

export const studentWithIdSchema = studentSchema.extend({
  id: z.string(),
});

export type Student = z.infer<typeof studentWithIdSchema>;
export type StudentSchema = z.infer<typeof studentSchema>;
