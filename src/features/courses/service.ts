import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import { db, type NextParam } from "../../lib/firebase";
import { studentsCol } from "../students/service";
import { courseConverter } from "./converter";
import type { CourseSchema } from "./validation";

const coursesCol = collection(db, "courses").withConverter(courseConverter);

export async function listCourses(pageParam: NextParam, search?: string) {
  const q = query(
    coursesCol,
    ...(search
      ? [
          where("name", ">=", search),
          where("name", "<=", search + "\uf8ff"),
          orderBy("name"),
        ]
      : [orderBy("createdAt", "desc")]),
    ...(pageParam ? [startAfter(pageParam)] : []),
    limit(20),
  );

  const coursesSnapshot = await getDocs(q);
  const docs = coursesSnapshot.docs.map((doc) => doc.data());

  const lastDoc = coursesSnapshot.docs[coursesSnapshot.docs.length - 1];

  return {
    data: docs,
    nextCursor: lastDoc ?? null,
  };
}

export async function createCourse(data: CourseSchema) {
  const docRef = await addDoc(coursesCol, data);
  return docRef.id;
}

export async function getCourseById(id: string) {
  const docRef = doc(coursesCol, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("Course not found");
  }
}

export async function updateCourse(id: string, data: CourseSchema) {
  const courseRef = doc(coursesCol, id);
  await updateDoc(courseRef, data);

  const studentsQuery = query(studentsCol, where("courseId", "==", id));
  const querySnapshot = await getDocs(studentsQuery);
  if (querySnapshot.empty) return;

  const batch = writeBatch(db);

  querySnapshot.forEach((studentDoc) => {
    const studentRef = doc(studentsCol, studentDoc.id);
    batch.update(studentRef, { courseName: data.name });
  });

  await batch.commit();
}

export async function deleteCourse(id?: string) {
  const docRef = doc(coursesCol, id);
  await deleteDoc(docRef);
}
