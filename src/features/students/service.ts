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
} from "firebase/firestore";

import { db, type NextParam } from "../../lib/firebase";
import { studentConverter } from "./converter";
import type { StudentSchema } from "./validation";

export const studentsCol = collection(db, "students").withConverter(
  studentConverter,
);

export async function listStudents(pageParam: NextParam, search?: string) {
  const q = query(
    studentsCol,
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
  const studentsSnapshot = await getDocs(q);
  const docs = studentsSnapshot.docs.map((doc) => doc.data());

  const lastDoc = studentsSnapshot.docs[studentsSnapshot.docs.length - 1];

  return {
    data: docs,
    nextCursor: lastDoc ?? null,
  };
}

export async function createStudent(data: StudentSchema) {
  const emailExists = await emailAlreadyExists(data.email);

  if (emailExists) {
    throw new Error("E-mail já existe. Por favor, use outro email.");
  }

  const docRef = await addDoc(studentsCol, data);
  return docRef.id;
}

export async function getStudentById(id: string) {
  const docRef = doc(studentsCol, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("Aluno não encontrado");
  }
}

export async function updateStudent(id: string, data: StudentSchema) {
  const emailExists = await emailAlreadyExists(data.email, id);

  if (emailExists) {
    throw new Error("E-mail já existe. Por favor, use outro email.");
  }

  const docRef = doc(studentsCol, id);
  await updateDoc(docRef, data);
}

export async function deleteStudent(id: string) {
  const docRef = doc(studentsCol, id);
  await deleteDoc(docRef);
}

export async function emailAlreadyExists(
  email: string,
  ignoreId?: string,
): Promise<boolean> {
  const q = query(studentsCol, where("email", "==", email.toLowerCase()));
  const studentsSnapshot = await getDocs(q);
  return studentsSnapshot.docs.some((doc) => doc.id !== ignoreId);
}

export async function studentsChart() {
  const studentsSnapshot = await getDocs(studentsCol);
  return studentsSnapshot.docs.map((s) => ({ ...s.data(), id: s.id }));
}