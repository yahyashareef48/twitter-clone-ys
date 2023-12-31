import { Link, useLocation } from "react-router-dom";
import { AuthButton } from "../pages/Auth";
import TweetFormOverlay from "./TweetFormOverlay";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const location = useLocation();
  const [user] = useAuthState(auth);

  return (
    <header className="max-w-[250px] xl:max-w-[60px] w-full sm:hidden">
      <nav className="flex flex-col justify-between min-h-screen text-xl text-[#e7e9ea]">
        <div className="grid">
          <div className="w-12 aspect-square p-3">
            <i className="fa-brands fa-twitter text-2xl pl-1"></i>
          </div>
          <Link
            className={`
              ${location.pathname === "/home" && "font-bold"}
              p-3 pr-6 xl:pr-0 w-max hover:bg-[#e7e9ea1a] transition rounded-full
            `}
            to="home"
          >
            <i className="fa-solid fa-house pl-1 pr-4"></i> <span className="xl:hidden">Home</span>
          </Link>
          <Link
            className={`
            ${location.pathname === "/explore" && "font-bold"}
            p-3 pr-6 xl:pr-0 w-max hover:bg-[#e7e9ea1a] transition rounded-full
          `}
            to="explore"
          >
            <i className="fa-solid fa-magnifying-glass pl-1 pr-4"></i>{" "}
            <span className="xl:hidden">Explore</span>
          </Link>
          {user && (
            <Link
              className={`
              ${location.pathname === "/profile" && "font-bold"}
              p-3 pr-6 xl:pr-0 w-max hover:bg-[#e7e9ea1a] transition rounded-full
            `}
              to={user.uid}
            >
              <i className="fa-regular font-bold fa-user pl-1 pr-4"></i>{" "}
              <span className="xl:hidden">Profile</span>
            </Link>
          )}

          <TweetFormOverlay user={user} />

          <div className="mt-[250px]">
            <AuthButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
