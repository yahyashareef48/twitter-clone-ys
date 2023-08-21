// Import the necessary Firebase SDK functions
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

// Get a reference to the Firestore database
export const db = getFirestore(app);

// Get a reference to the "tweets" and "users" collections
export const tweetColRef = collection(db, "tweets");
export const usersColRef = collection(db, "users");

// Get a reference to the Firebase Authentication service
export const auth = getAuth(app);

// Create a Google Auth provider instance
export const googleProvider = new GoogleAuthProvider();

/**
 * Add a new tweet to the "tweets" collection.
 * @param {string} photoURL - The URL of the user's profile photo.
 * @param {string} tweet - The content of the tweet.
 * @param {string} uid - The user's unique ID.
 * @param {string} userName - The user's username.
 * @param {string} mediaContent - The URL of any attached media content.
 */
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

/**
 * Handle the liking or unliking of a tweet.
 * @param {string} tweetId - The ID of the tweet.
 * @param {string} userId - The ID of the user.
 */
export async function handleLike(tweetId: string, userId: string) {
  // Get document reference for the tweet
  const docRef = doc(db, "tweets", tweetId);

  // Fetch data from the Firestore document
  const data = (await getDoc(docRef)).data();

  try {
    // Update the 'likes' array based on whether the user has liked or unliked the tweet
    const updatedData =
      data && data.likes.includes(userId)
        ? { ...data, likes: arrayRemove(userId) }
        : { ...data, likes: arrayUnion(userId) };

    // Update the document with the updated data
    updateDoc(docRef, updatedData);
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

/**
 * Add a new user to the "users" collection.
 * @param {string} uid - The user's unique ID.
 * @param {string} userName - The user's username.
 * @param {string} photoURL - The URL of the user's profile photo.
 */
export async function addUser(uid: string, userName: string, photoURL: string) {
  await addDoc(usersColRef, { uid, following: [], followers: [], userName, photoURL });
}

/**
 * Handle following or unfollowing another user.
 * @param {string} userDocId - The document ID of the user performing the action.
 * @param {string} profileDocId - The document ID of the profile being followed/unfollowed.
 * @param {string} uid - The user's unique ID.
 * @param {string} profileUid - The unique ID of the profile being followed/unfollowed.
 */
export async function handleFollow(
  userDocId: string,
  profileDocId: string,
  uid: string,
  profileUid: string
) {
  // Get document references for the user and profile
  const profileDocRef = doc(db, "users", profileDocId);
  const userDocRef = doc(db, "users", userDocId);

  // Fetch data from the Firestore documents
  const profileDoc = await getDoc(profileDocRef);
  const userDoc = await getDoc(userDocRef);

  // Check if both documents exist
  if (profileDoc.exists() && userDoc.exists()) {
    // Extract data from the fetched documents
    const profileData = profileDoc.data();
    const userData = userDoc.data();

    // Update profile data based on whether the user is being followed or unfollowed
    const updatedProfileData = {
      ...profileData,
      followers: profileData.followers.includes(uid) ? arrayRemove(uid) : arrayUnion(uid),
    };

    // Update user data based on whether the profile is being followed or unfollowed
    const updatedUserData = {
      ...userData,
      following: userData.following.includes(profileUid)
        ? arrayRemove(profileUid)
        : arrayUnion(profileUid),
    };

    try {
      // Create a batch to update both profile and user documents
      const batch = writeBatch(db);

      // Add update operations to the batch
      batch.update(profileDocRef, updatedProfileData);
      batch.update(userDocRef, updatedUserData);

      // Commit the batch to apply updates
      await batch.commit();
    } catch (error) {
      console.error("Error updating documents: ", error);
    }
  } else {
    console.error("Document not found");
  }
}

/**
 * Delete a tweet from the "tweets" collection.
 * @param {string} tweetId - The ID of the tweet to be deleted.
 */
export async function deleteTweet(tweetId: string) {
  const docRef = doc(db, "tweets", tweetId);

  deleteDoc(docRef);
}
