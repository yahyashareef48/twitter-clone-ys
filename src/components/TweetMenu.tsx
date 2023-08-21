import { useAuthState } from "react-firebase-hooks/auth";
import { auth, deleteTweet } from "../firebase";
import { useState } from "react";

export default function TweetMenu({ authorId, docId }: { authorId: string; docId: string }) {
  const [hide, setHide] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <div className="relative">
      {hide && (
        <div
          onClick={() => {
            const userChoice = confirm("Do you want to delete the tweet?");

            if (userChoice) {
              deleteTweet(docId);
              setHide(false);
            } else {
              setHide(false);
            }
          }}
          className="absolute p-4 min-w-[95px] cursor-pointer text-base font-bold bg-black right-10 mx-auto border-[1px] border-[#2f3336] rounded-2xl"
        >
          <span className="flex items-center text-[#f4212e]">
            <i className="fa-solid fa-trash-can mr-2"></i> Delete
          </span>
        </div>
      )}

      {authorId === user?.uid && (
        <button onClick={() => setHide((old) => !old)}>
          <i className="fa-solid fa-ellipsis text-[#71767b] hover:text-[#1d9bf0] hover:bg-[#1d9bf01a] p-2 rounded-full"></i>
        </button>
      )}
    </div>
  );
}
