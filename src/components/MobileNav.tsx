import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { AuthButton } from "../pages/Auth";

export default function MobileNav() {
  const [user] = useAuthState(auth);

  return (
    <nav className="mx-4 max-h-[inherit] grid grid-rows-1 grid-cols-4 place-items-center">
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

      <div className="mt-[250px] sm:mt-0">
        <AuthButton />
      </div>
    </nav>
  );
}
