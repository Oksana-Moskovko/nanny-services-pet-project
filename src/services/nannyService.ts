import { ref, get } from "firebase/database";
import { database } from "../firebase/config";
// import { database } from "./firebase"; // твій файл конфігурації

// curl 'https://nanny-services-pet-proje-7e9b4.firebaseio.com/users/jack/name.json'

// const res = await fetch("https://nanny-services-pet-proje-7e9b4.firebaseio.com/.json")

// export const fetchNannys = async () => {
//     const data = await res.json();
//     console.log(data);
    
// }

// export const fetchNannys = async (userIdToken) => {
//     try {
//         // Запитуємо конкретний шлях, наприклад, 'nannys'
//         // Якщо потрібно автентифікувати запит, додайте ?auth=${userIdToken}
//         const url = `https://nanny-services-pet-proje-7e9b4-default-rtdb.firebaseio.com/nannys.json?auth=${userIdToken}`; // Приклад шляху і додавання токена

//         const response = await fetch(url);

//         if (!response.ok) {
//             // Обробка HTTP помилок (наприклад, 401 Unauthorized, 403 Forbidden)
//             const errorText = await response.text();
//             throw new Error(`Failed to fetch nannys: ${response.status} ${response.statusText} - ${errorText}`);
//         }

//         const data = await response.json();
//         console.log(data);
//         return data; // Повернути отримані дані
//     } catch (error) {
//         console.error("Error fetching nannys:", error);
//         // Додаткова обробка помилок, наприклад, відображення повідомлення користувачеві
//         throw error; // Перекинути помилку далі, якщо потрібно
//     }
// };

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
  // const nannysRef = ref(database, "nannys");
  const snapshot = await get(ref(database, "nannies"));

  // const snapshot = await get(nannysRef);

  if (snapshot.exists()) {
    console.log(snapshot.val());
    return snapshot.val();
  } else {
    console.log("Немає даних");
    return null;
  }
}
