import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Profile() {
  const [user] = useAuthState(auth);
  const { uid } = useParams();

  console.log(uid);

  return <h1 className="font-bold text-xl p-4">Hello {user?.displayName} This Page is Under Development</h1>;
}
