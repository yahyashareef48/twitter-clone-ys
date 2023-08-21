import { useParams } from "react-router-dom";
import { colRef } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Feed from "../components/Feed";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Profile() {
  const [user] = useAuthState(auth);
  const { email } = useParams();
  const [tweets, loading, error] = useCollection(colRef);

  if (!tweets || tweets.empty) {
    return <p>No tweets found.</p>;
  }

  const filterdTweets = [...tweets.docs].filter((doc) => doc.data().email === email);

  return (
    <div className="max-w-[600px] w-full">
      <div className="relative">
        <div className="border-[1px] flex px-4 z-10 absolute max-w-[inherit] w-full border-[#2f3336] bg-black bg-opacity-80 bg-clip-padding backdrop-blur">
          <div className="w-14 flex justify-center items-center">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div>
            <p className="font-bold text-xl">{user?.displayName}</p>
            <span className=" text-sm text-[#71767b]">
              {filterdTweets.length} {filterdTweets.length === 1 ? "Post" : "Posts"}
            </span>
          </div>
        </div>
        <div id="feed" className="pt-[53px] w-full max-h-[99.9vh] absolute overflow-y-auto">
          <Feed tweets={filterdTweets} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
