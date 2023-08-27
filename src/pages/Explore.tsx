import SearchBar from "../components/SearchBar";
import { useCollection } from "react-firebase-hooks/firestore";
import { tweetColRef } from "../firebase";
import Feed from "../components/Feed";
import { Link, useLocation } from "react-router-dom";

export default function Explore() {
  const [tweets, loading, error] = useCollection(tweetColRef);
  const { search } = useLocation();
  const qValue = new URLSearchParams(search).get("q");

  const sortedTweets =
    tweets && [...tweets.docs].sort((a, b) => b.data().createdAt - a.data().createdAt);

  const filterdTweets =
    qValue &&
    sortedTweets &&
    sortedTweets.filter((t) => t.data().tweet.toLowerCase().includes(qValue.toLowerCase()));

  return (
    <>
      <div className="max-w-[600px] w-full">
        <div className="relative">
          <div className="border-[1px] flex justify-between px-4 z-10 absolute max-w-[inherit] w-full border-[#2f3336] bg-black bg-opacity-80 bg-clip-padding backdrop-blur">
            <Link to=".." className="w-10 flex items-center">
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <SearchBar />
          </div>
          <div id="feed" className="pt-[53px] w-full max-h-[99.9vh] absolute overflow-y-auto">
            {qValue && <Feed tweets={filterdTweets} loading={loading} error={error} />}
          </div>
        </div>
      </div>
    </>
  );
}
