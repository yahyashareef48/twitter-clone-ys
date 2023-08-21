import SearchBar from "../components/SearchBar";
import HomeHeader from "../components/HomeHeader";
import TweetForm from "../components/TweetForm";
import Feed from "../components/Feed";
import { tweetColRef } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Home() {
  const [tweets, loading, error] = useCollection(tweetColRef);

  // If tweets has data, you can proceed with rendering the sorted tweetList
  const sortedTweets =
    tweets && [...tweets.docs].sort((a, b) => b.data().createdAt - a.data().createdAt);

  return (
    <div className="flex">
      <div className="max-w-[600px] w-full">
        <div className="relative">
          <HomeHeader />
          <div id="feed" className="pt-[117px] w-full max-h-[100vh] absolute overflow-y-auto">
            <TweetForm />
            <Feed tweets={sortedTweets} loading={loading} error={error} />
          </div>
        </div>
      </div>

      <div className="max-w-sm w-full lg:hidden">
        <SearchBar />
      </div>
    </div>
  );
}
