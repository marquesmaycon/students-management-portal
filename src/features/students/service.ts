import { addDoc, collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase/app";
import { studentConverter } from "./converter";
import type { StudentSchema } from "./validation";

const studentsCol = collection(db, "students").withConverter(studentConverter);

export async function listStudents() {
  const studentsSnapshot = await getDocs(studentsCol);
  return studentsSnapshot.docs.map((doc) => doc.data());
}

export async function createStudent(data: StudentSchema) {
  const docRef = await addDoc(studentsCol, data);
  return docRef.id;
}
