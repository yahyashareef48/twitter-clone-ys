import { colRef } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Feed() {
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
    // Assuming each document contains a "tweet" field with the tweet content
    const data = doc.data();
    const tweet = data.tweet
      .replace(/\n{3,}/g, "<br/><br/>")
      .replace(/\n{2}/g, "<br/><br/>")
      .replace(/\n/g, "<br/>");

    return (
      <div className="flex max-w-[600px] p-4 border-[1px] border-t-0 border-[#2f3336]">
        <div>
          <img className="w-10 max-h-[40px] rounded-full mr-4" src={data.photoURL} alt="" />
        </div>

        <div>
          <p className="font-bold text-base mb-1">{data.userName}</p>
          <pre
            className="text-[#e0e0e2] text-base"
            key={doc.id}
            dangerouslySetInnerHTML={{
              __html: tweet,
            }}
          />

          {/* <div className="mt-4">
            <button>
              <i className="fa-regular fa-heart text-[#71767b]"></i>
              <i className="fa-solid fa-heart text-[#f91880]"></i>
            </button>
          </div> */}
        </div>
      </div>
    );
  });

  return <>{tweetList}</>;
}
