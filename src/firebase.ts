// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, addDoc, collection, Timestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const colRef = collection(getFirestore(app), "tweets");

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function addTweet(photoURL: string, tweet: string, uid: string, userName: string) {
  await addDoc(colRef, {
    createdAt: Timestamp.fromDate(new Date()),
    photoURL,
    tweet,
    uid,
    userName,
  });
}