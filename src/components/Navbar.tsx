import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { AuthButton } from "../pages/Auth";

export default function Navbar() {
  const location = useLocation();
  console.log(location);
  

  return (
    <header className="max-w-[250px] xl:max-w-[60px] w-full">
      <nav className="grid text-xl text-[#e7e9ea]">
        <div className="w-12 aspect-square p-3">
          <i className="fa-brands fa-twitter text-2xl pl-1"></i>
        </div>

        <Link
          className={`
            ${location.pathname === "/home" && "font-bold"}
            p-3 pr-6 w-max hover:bg-[#e7e9ea1a] transition rounded-full
          `}
          to="home"
        >
          <i className="fa-solid fa-house pl-1 pr-4"></i> <span className="xl:hidden">Home</span>
        </Link>

        <Link
          className={`
          ${location.pathname === "/explore" && "font-bold"}
          p-3 pr-6 w-max hover:bg-[#e7e9ea1a] transition rounded-full
        `}
          to="explore"
        >
          <i className="fa-solid fa-magnifying-glass pl-1 pr-4"></i>{" "}
          <span className="xl:hidden">Explore</span>
        </Link>

        <Link
          className={`
            ${location.pathname === "/profile" && "font-bold"}
            p-3 pr-6 w-max hover:bg-[#e7e9ea1a] transition rounded-full
          `}
          to="profile"
        >
          <i className="fa-regular font-bold fa-user pl-1 pr-4"></i>{" "}
          <span className="xl:hidden">Profile</span>
        </Link>

        <AuthButton />
      </nav>
    </header>
  );
}
