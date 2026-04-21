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
  where,
  writeBatch,
} from "firebase/firestore";

import { db } from "../../lib/firebase";
import { studentsCol } from "../students/service";
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
