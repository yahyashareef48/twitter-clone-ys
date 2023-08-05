import { useState } from "react";

export default function HomeHeader() {
  const [activeBtnIndex, setActiveBtnIndex] = useState(0);

  return (
    <div className="border-[1px] z-10 absolute max-w-[inherit] w-full border-[#2f3336] bg-black bg-opacity-80 bg-clip-padding backdrop-blur">
      <div className="flex justify-between items-center p-4">
        <h1 className="font-bold text-xl ">Home</h1>
      </div>
      <div className="flex justify-between text-base font-bold">
        <button
          onClick={() => {
            setActiveBtnIndex(0);
          }}
          className={`
                  ${activeBtnIndex !== 0 && "text-[#71767b]"}
                  p-4 w-full hover:bg-[#e7e9ea1a] transition
                `}
        >
          <span className={`${activeBtnIndex === 0 && "border-b-4"} py-3 border-[#1d9bf0]`}>
            For You
          </span>
        </button>
        <button
          onClick={() => {
            setActiveBtnIndex(1);
          }}
          className={`
                  ${activeBtnIndex !== 1 && "text-[#71767b]"}
                  p-4 w-full hover:bg-[#e7e9ea1a] transition
                `}
        >
          <span className={`${activeBtnIndex === 1 && "border-b-4"} py-3 border-[#1d9bf0]`}>
            Following
          </span>
        </button>
      </div>
    </div>
  );
}
