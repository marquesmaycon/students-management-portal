import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";

import type { SignInSchema } from "./validation";

export async function signIn(data: SignInSchema) {
  return signInWithEmailAndPassword(auth, data.email, data.password);
}

export async function signOutUser() {
  await signOut(auth);
}
