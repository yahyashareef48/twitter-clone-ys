import SearchBar from "../components/SearchBar";
import HomeHeader from "../components/HomeHeader";
import TweetForm from "../components/TweetForm";
import Feed from "../components/Feed";
import { tweetColRef, auth, usersColRef } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";

export default function Home() {
  // Fetch user's tweets collection
  const [tweets, loading, error] = useCollection(tweetColRef);

  // Get authenticated user's state
  const [user] = useAuthState(auth);

  // Fetch user data collection
  const [users] = useCollection(usersColRef);

  // Store the list of users that the authenticated user follows
  const [following, setFollowing] = useState<string[]>([]);

  // State to determine whether to filter tweets based on following
  const [shouldFilter, setShouldFilter] = useState(false);

  // Fetch the list of users that the authenticated user follows
  useEffect(() => {
    if (user && users) {
      // Filter users to find the matching profile by uid
      const matchedProfile = [...users.docs].find((u) => u.data().uid === user.uid);

      // If a matching profile is found, set the list of following users to state
      if (matchedProfile) {
        setFollowing(matchedProfile.data().following);
      }
    }
  }, [user, users]);

  // Callback to handle filtering of tweets
  const handlefilter = (value: boolean) => {
    setShouldFilter(value);
  };

  // If tweets are available, sort them by createdAt timestamp
  const sortedTweets =
    tweets && [...tweets.docs].sort((a, b) => b.data().createdAt - a.data().createdAt);

  // Filter tweets based on whether user is following the author
  const followingTweets = sortedTweets?.filter((t) => following.includes(t.data().uid));

  return (
    <div className="flex">
      <div className="max-w-[639px] w-full">
        <div className="relative">
          {/* Render header for filtering */}
          <HomeHeader handleFunc={handlefilter} />
          <div id="feed" className="pt-[117px] w-full max-h-[100vh] absolute overflow-y-auto">
            {/* Render tweet form */}
            <TweetForm />
            {/* Render feed with filtered or sorted tweets */}
            <Feed
              tweets={shouldFilter ? followingTweets : sortedTweets}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
      {/* Render search bar for mobile view */}
      <div className="max-w-sm w-full lg:hidden">
        <SearchBar />
      </div>
    </div>
  );
}