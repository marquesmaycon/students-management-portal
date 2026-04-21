import { fakerPT_BR as faker } from "@faker-js/faker";
import {
  collection,
  doc,
  getDocs,
  Timestamp,
  writeBatch,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

const courseNames = [
  "Análise e Desenvolvimento de Sistemas",
  "Engenharia de Software",
  "Direito",
  "Administração",
  "Psicologia",
  "Medicina",
  "Arquitetura",
  "Ciência da Computação",
];

const coursesCol = collection(db, "courses");

export async function courseSeeder() {
  const batch = writeBatch(db);

  courseNames.forEach((name) => {
    const docRef = doc(coursesCol);

    const date = faker.date.past({ refDate: new Date("01/01/2026") });
    const payload = {
      name: name,
      createdAt: Timestamp.fromDate(date),
    };

    batch.set(docRef, payload);
  });

  await batch.commit();
}

export async function wipeCourses() {
  const snapshot = await getDocs(coursesCol);

  const batch = writeBatch(db);

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  console.log("Courses deletados 🚀");
}
