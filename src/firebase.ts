// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXlqLg9S42MJ9aoKTPEdKTqxRAFfxrq1s",
  authDomain: "twitter-clone-ys.firebaseapp.com",
  projectId: "twitter-clone-ys",
  storageBucket: "twitter-clone-ys.appspot.com",
  messagingSenderId: "344615219381",
  appId: "1:344615219381:web:20398459e3aeeb033ccefc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
