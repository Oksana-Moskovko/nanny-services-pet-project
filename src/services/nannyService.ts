import { ref, get } from "firebase/database";
import { database } from "../firebase/config";

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
    // console.log(snapshot.val());
    return snapshot.val();
  } else {
    console.log("Немає даних");
    return null;
  }
}
