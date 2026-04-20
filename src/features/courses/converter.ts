import type { FirestoreDataConverter } from "firebase/firestore";

import { type Course, courseSchema, coursetWithIdSchema } from "./validation";

export const courseConverter: FirestoreDataConverter<Course> = {
  toFirestore(course) {
    return courseSchema.parse(course);
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return coursetWithIdSchema.parse({ id: snapshot.id, ...data });
  },
};
