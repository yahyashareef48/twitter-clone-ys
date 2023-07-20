import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useState } from "react";
import DOMPurify from "dompurify";

export default function TweetForm() {
  const [post, setPost] = useState("");
  const [user] = useAuthState(auth);

  return (
    <>
      {user && (
        <div className="flex p-4 border-[1px] border-t-0 border-[#2f3336]">
          <img
            className="w-10 max-h-[40px] rounded-full mr-4"
            src={user?.photoURL ?? undefined}
            alt="profile Image"
          />
          <div className="w-full">
            <textarea
              rows={5}
              value={post}
              onChange={(e) => {
                setPost(DOMPurify.sanitize(e.target.value));
              }}
              className="w-full text-xl outline-none resize-none max-h-20 bg-black border-b-[1px] border-[#2f3336]"
              placeholder="What is happening?!"
            />
            <button className="bg-[#00ACEE] px-4 py-1 my-1 rounded-full font-bold text-base">
              Tweet
            </button>
          </div>
        </div>
      )}
    </>
  );
}
