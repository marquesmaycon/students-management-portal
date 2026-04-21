import { fakerPT_BR as faker } from "@faker-js/faker";
import {
  collection,
  doc,
  getDocs,
  Timestamp,
  writeBatch,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

const coursesCol = collection(db, "courses");
const studentsCol = collection(db, "students");

export async function studentSeeder() {
  const coursesSnapshot = await getDocs(coursesCol);

  const courses = coursesSnapshot.docs.map((d) => ({
    id: d.id,
    name: d.data().name,
  }));

  const batch = writeBatch(db);

  Array.from({ length: 100 }).forEach(() => {
    const docRef = doc(studentsCol);

    const course = courses[Math.floor(Math.random() * courses.length)];

    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLocaleLowerCase(),
      age: faker.number.int({ min: 18, max: 100 }),
      courseId: course.id,
      courseName: course.name,
      createdAt: Timestamp.fromDate(faker.date.recent({ days: 90 })),
    };

    batch.set(docRef, payload);
  });

  await batch.commit();
}

export async function wipeStudents() {
  const snapshot = await getDocs(studentsCol);

  const batch = writeBatch(db);

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  console.log("Students deletados 🚀");
}
