// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";

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

export const db = getFirestore(app);
export const tweetColRef = collection(db, "tweets");
export const usersColRef = collection(db, "users");

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function addTweet(
  photoURL: string,
  tweet: string,
  uid: string,
  userName: string,
  mediaContent: string
) {
  await addDoc(tweetColRef, {
    createdAt: Timestamp.fromDate(new Date()),
    photoURL,
    tweet,
    uid,
    userName,
    likes: [],
    mediaContent,
  });
}

export async function handleLike(tweetId: string, userId: string) {
  const docRef = doc(db, "tweets", tweetId);

  const data = (await getDoc(docRef)).data();

  try {
    const updatedData =
      data && data.likes.includes(userId)
        ? { ...data, likes: arrayRemove(userId) }
        : { ...data, likes: arrayUnion(userId) };

    updateDoc(docRef, updatedData);
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

export async function addUser(uid: string, userName: any, photoURL: any) {
  await addDoc(usersColRef, { uid, following: [], followers: [], userName, photoURL });
}

export async function handleFollow(
  userDocId: string,
  profileDocId: string,
  uid: string,
  profileUid: string
) {
  const profileDocRef = doc(db, "users", profileDocId);
  const userDocRef = doc(db, "users", userDocId);

  const profileDoc = await getDoc(profileDocRef);
  const userDoc = await getDoc(userDocRef);

  console.log(userDoc.data());

  if (profileDoc.exists() && userDoc.exists()) {
    const profileData = profileDoc.data()!;
    const userData = userDoc.data()!;

    const updatedProfileData = {
      ...profileData,
      followers: profileData.followers.includes(uid) ? arrayRemove(uid) : arrayUnion(uid),
    };

    const updatedUserData = {
      ...userData,
      following: userData.following.includes(profileUid)
        ? arrayRemove(profileUid)
        : arrayUnion(profileUid),
    };

    try {
      const batch = writeBatch(db);

      batch.update(profileDocRef, updatedProfileData);
      batch.update(userDocRef, updatedUserData);

      await batch.commit();
    } catch (error) {
      console.error("Error updating documents: ", error);
    }
  } else {
    console.error("Document not found");
  }
}

export async function deleteTweet(tweetId: string) {
  const docRef = doc(db, "tweets", tweetId);

  deleteDoc(docRef);
}
