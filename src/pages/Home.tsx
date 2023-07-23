import SearchBar from "../components/SearchBar";
import HomeHeader from "../components/HomeHeader";
import TweetForm from "../components/TweetForm";
import Feed from "../components/Feed";

export default function Home() {
  return (
    <div className="flex">
      <div className="max-w-[600px] w-full">
        <HomeHeader />
        <div className="flex flex-col max-h-[calc(100vh-100px)] overflow-y-auto">
          <TweetForm />
          <Feed />
        </div>
      </div>

      <div className="max-w-sm w-full lg:hidden">
        <SearchBar />
      </div>
    </div>
  );
}
