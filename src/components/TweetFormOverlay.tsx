import { useState } from "react";
import TweetForm from "./TweetForm";
import { useNavigate } from "react-router-dom";
import Overlay from "./Overlay";

export default function TweetFormOverlay({ user }: any) {
  const [overlay, setOverlay] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      <Overlay show={overlay}>
        <div className="max-w-[600px] bg-black w-full h-max mt-12 rounded-3xl">
          <button className="m-4" onClick={() => setOverlay(false)}>
            <i className="fa-solid fa-x"></i>
          </button>
          <TweetForm handleFunc={() => setOverlay(false)} />
        </div>
      </Overlay>

      {/* Button to toggle the overlay */}
      <button
        onClick={() => (user ? setOverlay(true) : navigate("/login"))}
        className="p-3 m-4 xl:m-2 bg-blue-400 rounded-full"
      >
        <i className="fa-solid fa-feather-pointed hidden xl:block"></i>
        <span className="xl:hidden font-bold">Tweet</span>
      </button>
    </>
  );
}
