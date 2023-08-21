import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { handleLike } from "../firebase";

export default function LikeButton({ docId, data }: { docId: string; data: any }) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const likesLength = data && data.likes ? data.likes.length : 0;
  const userLiked = data.likes && user ? data.likes.includes(user.email) : false;

  const [error, setError] = useState<string | null>(null);

  const handleLikeClick = async () => {
    if (user && user.email) {
      try {
        await handleLike(docId, user.email);
      } catch (error) {
        setError("An error occurred while processing the like. Please try again later.");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <button
        className={userLiked ? "text-[#f91880]" : "text-[#71767b] hover:text-[#f91880]"}
        onClick={handleLikeClick}
      >
        {userLiked ? (
          <i className="fa-solid fa-heart"></i>
        ) : (
          <i className="fa-regular fa-heart "></i>
        )}
        {likesLength > 0 && <span className="ml-2">{likesLength}</span>}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
