import type { FirestoreDataConverter } from "firebase/firestore";

import { type Student, studentSchema, studentWithIdSchema } from "./validation";

export const studentConverter: FirestoreDataConverter<Student> = {
  toFirestore(student) {
    return studentSchema.parse(student);
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return studentWithIdSchema.parse({ id: snapshot.id, ...data });
  },
};
