import { useState } from "react";
import { FocusScope } from "react-aria";
import TweetForm from "./TweetForm";

export default function TweetFormOverlay() {
  const [overlay, setOverlay] = useState(false);

  return (
    <>
      {/* Overlay */}
      {overlay && (
        <FocusScope contain autoFocus>
          <div className="flex justify-center items-center fixed w-full h-full top-0 left-0 right-0 bottom-0 z-50 bg-blue-200 bg-opacity-20">
            <div className="max-w-[600px] bg-black w-full rounded-3xl">
              <button className="m-4" onClick={() => setOverlay(false)}>
                <i className="fa-solid fa-x"></i>
              </button>
              <TweetForm />
            </div>
          </div>
        </FocusScope>
      )}

      {/* Button to toggle the overlay */}
      <button onClick={() => setOverlay(true)} className="p-3 m-4 xl:m-2 bg-blue-400 rounded-full">
        <i className="fa-solid fa-feather-pointed hidden xl:block"></i>
        <span className="xl:hidden font-bold">Tweet</span>
      </button>
    </>
  );
}
