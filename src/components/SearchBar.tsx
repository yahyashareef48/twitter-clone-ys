import { useNavigate } from "react-router-dom";

export default function SearchBar() {

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault()
    navigate("/explore?q=" + e.target.searchQuery.value)
  };

  return (
    <div className="max-w-[500px] w-full px-6 py-1">
      <form onSubmit={handleSubmit} className="flex rounded-full items-center bg-[#202327] w-full">
        <button>
          <i className="fa-solid fa-magnifying-glass text-[#71767b] pl-4 pr-1"></i>
        </button>
        <input
          className="p-3 placeholder:text-[#71767b] rounded-full outline-none bg-[#202327]  w-full"
          type="text"
          name="searchQuery"
          placeholder="Search Fake Twitter..."
        />
      </form>
    </div>
  );
}
