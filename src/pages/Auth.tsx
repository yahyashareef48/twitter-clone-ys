import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Auth() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/home")
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
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
        <img className="w-8" src="../../public/7123025_logo_google_g_icon.svg" />
        Sign in with google
      </button>
    </div>
  );
}

export function AuthButton() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        <div
          className={`
            p-3 pr-6 w-max text-base font-bold hover:bg-[#e7e9ea1a] transition rounded-full flex
          `}
        >
          <img src={user.photoURL || undefined} className="mr-2 w-9 rounded-full" />
          <button onClick={() => signOut(auth)}>{user.displayName}</button>
        </div>
      ) : (
        <Link
          className={`
            p-3 pr-6 w-max hover:bg-[#e7e9ea1a] transition rounded-full
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
