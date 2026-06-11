import { ref, get, set, remove } from "firebase/database";
import { auth, database } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export interface Nanny {
  id: string,
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

  if (!snapshot.exists()) return [];

  const data = snapshot.val() as Record<string, Nanny>;

  return Object.entries(data).map(([id, nanny]) => ({
  id,
  ...nanny,
  }));
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
      favorites: {},
    }
  );

  return userCredential.user;
}

export async function logInUser(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export function logout() {
  return signOut(auth);
}


export async function toggleFavorite(userId, nannyId, isFavorite) {
  const favRef = ref(database, `users/${userId}/favorites/${nannyId}`);

  if (isFavorite) {
    await remove(favRef);
  } else {
    await set(favRef, true);
  }
}

export async function fetchFavorite(userId: string) {
  const snapshot = await get(ref(database, `users/${userId}/favorites/`));
return snapshot.exists() ? snapshot.val() : {};
}