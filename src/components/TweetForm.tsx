import { useAuthState } from "react-firebase-hooks/auth";
import { auth, addTweet } from "../firebase";
import { useState } from "react";
import DOMPurify from "dompurify";

interface TweetFormProps {
  handleFunc?: () => void;
}

export default function TweetForm({ handleFunc }: TweetFormProps) {
  const [tweet, setTweet] = useState("");
  const [user] = useAuthState(auth);

  const handleSubmit = () => {
    if (user && user.photoURL && user.uid && user.displayName) {
      if (tweet.trim().length > 0) {
        addTweet(user.photoURL, tweet, user.uid, user.displayName);
        setTweet("");
        handleFunc && handleFunc();
      } else {
        alert("Write something");
      }
    } else {
      alert("Sign in first!");
    }
  };

  return (
    <>
      {user && (
        <div className="flex max-w-[600px] p-4 border-[1px] border-t-0 border-[#2f3336]">
          <img
            className="w-10 max-h-[40px] rounded-full mr-4"
            src={user?.photoURL ?? undefined}
            alt="profile Image"
          />
          <div className="w-full">
            <textarea
              rows={5}
              value={tweet}
              onChange={(e) => {
                setTweet(DOMPurify.sanitize(e.target.value));
              }}
              className="w-full text-xl outline-none resize-none max-h-20 bg-black border-b-[1px] border-[#2f3336]"
              placeholder="What is happening?!"
            />
            <button
              onClick={handleSubmit}
              className="bg-[#00ACEE] px-4 py-1 my-1 rounded-full font-bold text-base"
            >
              Tweet
            </button>
          </div>
        </div>
      )}
    </>
  );
}
