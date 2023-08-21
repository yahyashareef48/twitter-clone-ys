import { useParams, Link } from "react-router-dom";
import { tweetColRef } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Feed from "../components/Feed";
import ProfileHead from "../components/ProfileHead";
import { useState } from "react";

export default function Profile() {
  const { uid } = useParams();
  const [tweets, loading, error] = useCollection(tweetColRef);
  const [userName, setUserName] = useState("");

  // Updates the user's name in the state.
  const handleUserName = (name: string) => {
    setUserName(name);
  };

  if (!tweets || tweets.empty) {
    return <p>No tweets found.</p>;
  }

  // Filter and sort tweets by the user's UID and creation time
  const filterdTweets = [...tweets.docs]
    .filter((doc) => doc.data().uid === uid)
    .sort((a, b) => b.data().createdAt - a.data().createdAt);

  return (
    <div className="max-w-[600px] w-full">
      <div className="relative">
        <div className="border-[1px] flex px-4 z-10 absolute max-w-[inherit] w-full border-[#2f3336] bg-black bg-opacity-80 bg-clip-padding backdrop-blur">
          <Link to=".." className="w-10 flex items-center">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <div>
            <p className="font-bold text-xl">{userName}</p>
            <span className=" text-sm text-[#71767b]">
              {filterdTweets.length} {filterdTweets.length === 1 ? "Post" : "Posts"}
            </span>
          </div>
        </div>
        <div id="feed" className="pt-[53px] w-full max-h-[99.9vh] absolute overflow-y-auto">
          <ProfileHead uid={uid} handleFunc={handleUserName} />

          <Feed tweets={filterdTweets} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
