import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/app";
import { courseConverter } from "./converter";
import type { CourseSchema } from "./validation";

const coursesCol = collection(db, "courses").withConverter(courseConverter);

export async function listCourses() {
  const q = query(coursesCol, orderBy("createdAt", "desc"));
  const coursesSnapshot = await getDocs(q);
  return coursesSnapshot.docs.map((doc) => doc.data());
}

export async function createCourse(data: CourseSchema) {
  const docRef = await addDoc(coursesCol, data);
  return docRef.id;
}

export async function getCourseById(id: string) {
  const docRef = doc(coursesCol, id).withConverter(courseConverter);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("Course not found");
  }
}

export async function updateCourse(id: string, data: CourseSchema) {
  const docRef = doc(coursesCol, id);
  await updateDoc(docRef, data);
}

export async function deleteCourse(id: string) {
  const docRef = doc(coursesCol, id);
  await deleteDoc(docRef);
}
