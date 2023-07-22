import SearchBar from "../components/SearchBar";
import HomeHeader from "../components/HomeHeader";
import TweetForm from "../components/TweetForm";
import Feed from "../components/Feed";

export default function Home() {
  return (
    <div className="flex">
      <div className="max-w-[600px] w-full">
        <HomeHeader />
        <TweetForm />
        <Feed />
      </div>

      <div className="max-w-sm w-full lg:hidden">
        <SearchBar />
      </div>
    </div>
  );
}
