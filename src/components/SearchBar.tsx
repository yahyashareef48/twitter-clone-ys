export default function SearchBar() {
  return (
    <div className="max-w-[500px] w-full px-6 py-1 lg:hidden">
      <div className="flex rounded-full items-center bg-[#202327] w-full">
        <i className="fa-solid fa-magnifying-glass text-[#71767b] pl-4 pr-1 py-3"></i>
        <input
          className="p-3 rounded-full outline-none bg-[#202327]  w-full"
          type="text"
          placeholder="Search Fake Twitter..."
        />
      </div>
    </div>
  );
}
