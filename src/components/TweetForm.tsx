import { useAuthState } from "react-firebase-hooks/auth";
import { auth, addTweet } from "../firebase";
import { useState } from "react";
import DOMPurify from "dompurify";
import Overlay from "./Overlay";

interface TweetFormProps {
  handleFunc?: () => void;
}

export default function TweetForm({ handleFunc }: TweetFormProps) {
  const [tweet, setTweet] = useState("");
  const [user] = useAuthState(auth);
  const [imgOverlay, setImgOvberlay] = useState(false);
  const [mediaContent, setMediaContent] = useState("");

  const handleMediaContent = () => {
    if (user && user.photoURL && user.uid && user.displayName) {
      if (mediaContent.trim().length > 0) {
        if (mediaContent.startsWith("<iframe")) {
          setMediaContent(mediaContent);
        } else if (mediaContent.startsWith("https://")) {
          setMediaContent(DOMPurify.sanitize(mediaContent));
        }
        setImgOvberlay(false);
      } else {
        alert("Past Your Media Content");
      }
    } else {
      alert("Sign in first!");
    }
  };

  const handleSubmit = () => {
    if (user && user.photoURL && user.uid && user.displayName) {
      if (tweet.trim().length > 0 || mediaContent.length > 0) {
        addTweet(user.photoURL, tweet, user.uid, user.displayName, mediaContent);
        setTweet("");
        setMediaContent("");
        handleFunc && handleFunc();
      } else {
        alert("Write something");
      }
    } else {
      alert("Sign in first!");
    }
  };

  return (
    <>
      {user && (
        <div className="flex max-w-[600px] px-4 pt-4 border-[1px] border-t-0 border-[#2f3336]">
          <img
            className="w-10 max-h-[40px] rounded-full mr-4"
            src={user?.photoURL ?? undefined}
            alt="profile mediaContent"
          />
          <div className="w-full">
            <textarea
              rows={5}
              value={tweet}
              onChange={(e) => {
                setTweet(DOMPurify.sanitize(e.target.value));
              }}
              className="w-full text-xl outline-none resize-none max-h-20 bg-black"
              placeholder="What is happening?!"
            />

            {mediaContent.length > 0 && (
              <div className="my-3">
                {mediaContent.startsWith("<iframe") ? (
                  <div className="aspect-video" dangerouslySetInnerHTML={{ __html: mediaContent }} />
                ) : (
                  <img
                    src={mediaContent}
                    className="rounded-2xl aspect-auto object-cover w-full h-full"
                    alt="Embedded Image"
                  />
                )}
              </div>
            )}

            <hr className="bg-[#2f3336] h-[1px] my-1 border-none" />

            <div className="flex justify-between items-center">
              <div>
                <div>
                  <Overlay show={imgOverlay}>
                    <div className="max-w-[600px] flex bg-black w-full h-max mt-12 rounded-3xl">
                      <button
                        className="m-4"
                        onClick={() => {
                          setImgOvberlay(false);
                          setMediaContent("");
                        }}
                      >
                        <i className="fa-solid fa-x"></i>
                      </button>
                      <input
                        type="text"
                        placeholder="Past Your Media Content"
                        value={mediaContent}
                        onChange={(e) => {
                          const userInput = e.target.value;
                          setMediaContent(userInput);
                        }}
                        className="m-4 w-full text-xl outline-none resize-none max-h-20 bg-black border-b-[1px] border-[#2f3336]"
                      />
                      <button
                        onClick={handleMediaContent}
                        className="bg-[#1d9bf0] px-4 py-1 m-1 rounded-3xl font-bold text-base"
                      >
                        Add
                      </button>
                    </div>
                  </Overlay>
                  <i
                    onClick={() => {
                      mediaContent.length < 1 && setImgOvberlay(true);
                    }}
                    className={`fa-regular fa-image p-2 rounded-full transition-all ${
                      mediaContent.length < 1
                        ? "hover:bg-[#1d9cf038] text-[#1d9bf0] cursor-pointer"
                        : "text-[#1d9cf08b]"
                    }`}
                  ></i>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-[#1d9bf0] px-4 py-1 my-1 rounded-full font-bold text-base"
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
