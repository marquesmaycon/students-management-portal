import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

import type { SignInSchema } from "./validation";

export async function signIn(data: SignInSchema) {
  return signInWithEmailAndPassword(auth, data.email, data.password);
}

export async function signUp(name: string, email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", cred.user.uid), {
    name,
    email,
    createdAt: new Date(),
  });

  return cred.user;
}

export async function signOutUser() {
  await signOut(auth);
}
