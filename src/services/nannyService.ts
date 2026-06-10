import { ref, get, set } from "firebase/database";
import { auth, database } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

export interface Nanny {
  about: string,
  avatar_url: string,
  birthday: string,
  characters: [],
  education: string,
  experience: string,
  kids_age: string,
  location: string,
  name: string,
  price_per_hour: number,
  rating: number,
  reviews: [],
}

export async function fetchNannies() {
  const snapshot = await get(ref(database, "nannies"));

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("Немає даних");
    return null;
  }
}

export async function registerUser(name: string, email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  await updateProfile(userCredential.user, {
    displayName: name,
  });

  await set(
    ref(database, `users/${userCredential.user.uid}`),
    {
      name,
      email,
    }
  );

  return userCredential.user;
}

export async function logInUser(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}