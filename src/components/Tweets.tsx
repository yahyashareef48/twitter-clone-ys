import { colRef } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Tweets() {
  const [tweets, loading, error] = useCollection(colRef);

  // Handle loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // If tweets is empty, render "No tweets found" message
  if (!tweets || tweets.empty) {
    return <p>No tweets found.</p>;
  }

  // If tweets has data, you can proceed with rendering the sorted tweetList
  const sortedTweets = [...tweets.docs].sort((a, b) => b.data().createdAt - a.data().createdAt);

  const tweetList = sortedTweets.map((doc) => {
    // Assuming each document contains a "text" field with the tweet content
    const data = doc.data();
    return <div key={doc.id}>{data.tweet}</div>;
  });

  return <>{tweetList}</>;
}
