import { useState } from "react";
import SearchBar from "../components/SearchBar";
import HomeHeader from "../components/HomeHeader";

export default function Home() {

  return (
    <div className="flex">
      <div className="max-w-[600px] w-full">
        <HomeHeader/>
        <div>
          {/* FORM TO ADD POST */}
        </div>
        <div>
          {/* POSTS */}
        </div>
      </div>

      <div className="max-w-sm w-full">
        <SearchBar />
      </div>
    </div>
  );
}
