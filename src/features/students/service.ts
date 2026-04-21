import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../lib/firebase";
import { studentConverter } from "./converter";
import type { StudentSchema } from "./validation";

export const studentsCol = collection(db, "students").withConverter(
  studentConverter,
);

export async function listStudents() {
  const studentsSnapshot = await getDocs(studentsCol);
  return studentsSnapshot.docs.map((doc) => doc.data());
}

export async function createStudent(data: StudentSchema) {
  const docRef = await addDoc(studentsCol, data);
  return docRef.id;
}

export async function getStudentById(id: string) {
  const docRef = doc(studentsCol, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("Student not found");
  }
}

export async function updateStudent(id: string, data: StudentSchema) {
  const docRef = doc(studentsCol, id);
  await updateDoc(docRef, data);
}

export async function deleteStudent(id: string) {
  const docRef = doc(studentsCol, id);
  await deleteDoc(docRef);
}
