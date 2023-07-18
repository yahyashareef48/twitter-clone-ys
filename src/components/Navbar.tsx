import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="max-w-[250px] w-full">
      <nav className="grid text-xl text-[#e7e9ea]">
        <div className="w-12 aspect-square p-3">
          <i className="fa-brands fa-twitter text-2xl"></i>
        </div>
        <Link className="p-3" to="home">
          <i className="fa-solid fa-house pr-4"></i> Home
        </Link>
        <Link className="p-3" to="explore">
          <i className="fa-solid fa-magnifying-glass pr-4"></i> Explore
        </Link>
        <Link className="p-3" to="user name">
          <i className="fa-regular fa-user pr-4"></i> Profile
        </Link>
      </nav>
    </header>
  );
}
