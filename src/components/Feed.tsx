import LikeButton from "./LikeButton";
import TweetMenu from "./TweetMenu";
import { Link } from "react-router-dom";

type FeedTypes = {
  tweets: any | undefined;
  loading: boolean;
  error: any | undefined;
};

export default function Feed({ tweets, loading, error }: FeedTypes) {
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

  const tweetList = tweets.map((doc: any, index: number) => {
    // Assuming each document contains a "tweet" field with the tweet content
    const data = doc.data();    

    const tweet = data.tweet
      .replace(/\n{3,}/g, "<br/><br/>")
      .replace(/\n{2}/g, "<br/><br/>")
      .replace(/\n/g, "<br/>")
      .replace(/(.{20})/g, "$1&#8203;");

    return (
      <div key={index} className="flex max-w-[639px] p-4 border-[1px] border-[#2f3336]">
        <div className="min-w-[56px]">
          <img className="w-10 max-h-[40px] rounded-full mr-4" src={data.photoURL} alt="profile image" />
        </div>

        <div className="w-full">
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="font-bold text-base">
                <Link to={`/${data.uid}`}>{data.userName}</Link>
              </span>
              <div className=" relative">
                <div className=" absolute top-[-.2rem] right-0">
                  <TweetMenu authorId={data.uid} docId={doc.id} />
                </div>
              </div>
            </div>

            <div
              className="text-[#e0e0e2] text-base break-words"
              dangerouslySetInnerHTML={{
                __html: tweet,
              }}
            />
            {data.mediaContent && (
              <div>
                {data.mediaContent.startsWith("<iframe") ? (
                  <div
                    className="aspect-video"
                    dangerouslySetInnerHTML={{ __html: data.mediaContent }}
                  />
                ) : (
                  <img
                    src={data.mediaContent}
                    className="rounded-2xl aspect-auto object-cover w-full h-full"
                    alt="Image"
                  />
                )}
              </div>
            )}
          </div>

          <div className="mt-2">
            <LikeButton docId={doc.id} data={data} />
          </div>
        </div>
      </div>
    );
  });

  return <div>{tweetList}</div>;
}
