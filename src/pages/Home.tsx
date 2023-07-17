import { useState } from "react";

export default function Home() {
  const [activeBtnIndex, setActiveBtnIndex] = useState(0);

  return (
    <main className="max-w-xl w-full border-[1px] border-[#2f3336]">
      <header className="fixed max-w-xl w-full border-[1px] border-[#2f3336]">
        <div className="flex justify-between items-center p-4">
          <h1 className="font-bold text-xl ">Home</h1>

          <div className="flex rounded-full items-center bg-[#202327] w-full max-w-xs">
            <i className="fa-solid fa-magnifying-glass text-[#71767b] pl-4 pr-1 py-3"></i>
            <input
              className="p-3 rounded-full outline-none bg-[#202327]  w-full"
              type="text"
              placeholder="Search Fake Twitter"
            />
          </div>
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
      </header>
      {/* ADD POSTS FORM */}
      {/* POSTS */}
    </main>
  );
}
