import {
  type FirestoreDataConverter,
  serverTimestamp,
} from "firebase/firestore";

import { type Course, courseSchema, coursetWithIdSchema } from "./validation";

export const courseConverter: FirestoreDataConverter<Course> = {
  toFirestore(course) {
    const parsed = courseSchema.parse(course);
    return {
      ...parsed,
      createdAt: serverTimestamp(),
    };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return coursetWithIdSchema.parse({ id: snapshot.id, ...data });
  },
};
