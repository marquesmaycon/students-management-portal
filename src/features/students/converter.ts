import {
  type FirestoreDataConverter,
  serverTimestamp,
} from "firebase/firestore";

import { type Student, studentSchema, studentWithIdSchema } from "./validation";

export const studentConverter: FirestoreDataConverter<Student> = {
  toFirestore(student) {
    const parsed = studentSchema.parse(student);
    return {
      ...parsed,
      createdAt: serverTimestamp(),
    };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return studentWithIdSchema.parse({ id: snapshot.id, ...data });
  },
};
