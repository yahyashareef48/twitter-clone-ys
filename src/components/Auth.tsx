import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export default function Auth() {

  const [user, loading, error] = useAuthState(auth);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  user && console.log(user);

  return (
    <div className="">
      <button onClick={() => (user ? signOut(auth) : signInWithGoogle())}>
        Sign in with google
      </button>
    </div>
  );
}
