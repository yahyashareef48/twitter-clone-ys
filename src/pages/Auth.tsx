import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider, addUser, usersColRef } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import googleIcon from "../../public/7123025_logo_google_g_icon.svg";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Auth() {
  const [user] = useAuthState(auth);
  const [users, userLoading] = useCollection(usersColRef);
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/home");
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      
    const user = auth.currentUser;
    if (user) {
      // Ensure 'users' is defined and not loading
      if (users && !userLoading) {
        const usersArray = users.docs.map((doc) => doc.data());
        const userExists = usersArray.some((u) => u.uid === user.uid);

        if (!userExists && user.displayName && user.photoURL) {
          await addUser(user.uid, user.displayName, user.photoURL);
          // Other actions after adding user
        }
      }
    }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <button
        className="bg-white text-black py-1 flex justify-center items-center rounded-full w-[280px]"
        onClick={() => (user ? signOut(auth) : signInWithGoogle())}
      >
        <img className="w-8 mr-1" src={googleIcon} />
        Sign in with google
      </button>
    </div>
  );
}

export function AuthButton() {
  const [hide, setHide] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        <div className="relative">
          {hide && (
            <div
              onClick={() => {
                signOut(auth);
              }}
              className="absolute p-4 min-w-[95px] cursor-pointer text-base font-bold bg-black bottom-12 left-8 border-[1px] border-[#2f3336] rounded-2xl"
            >
              <span>Log out</span>
            </div>
          )}
          <div
            onClick={() => {
              setHide((old) => !old);
            }}
            className={`
              p-3 xl:p-2 w-max text-base font-bold hover:bg-[#e7e9ea1a] transition rounded-full flex
            `}
          >
            <img src={user.photoURL || undefined} className="mr-2 xl:mr-0 w-9 rounded-full" />
            <span className="flex items-center xl:hidden">{user.displayName}</span>
          </div>
        </div>
      ) : (
        <Link
          className={`
            p-3 pr-6 xl:pr-0 w-max hover:bg-[#e7e9ea1a] transition rounded-full
          `}
          to="login"
        >
          <i className="fa-solid fa-arrow-right-to-bracket pl-1 pr-4"></i>
          <span className="xl:hidden">Sign In</span>
        </Link>
      )}
    </>
  );
}
