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
  const [imgURL, setImgURL] = useState("");
  const [user] = useAuthState(auth);
  const [imgOverlay, setImgOvberlay] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleImg = () => {
    if (user && user.photoURL && user.uid && user.displayName) {
      if (imgURL.trim().length > 0) {
        console.log(images);
        
        if (images.length < 1) {
          setImages((oldImages) => [...oldImages, imgURL]);
          setImgURL("");
          setImgOvberlay(false);
        } else {
          setImgURL("");
          setImgOvberlay(false);
          alert("Max 1 Image")
        }
      } else {
        alert("Past Image URL");
      }
    } else {
      alert("Sign in first!");
    }
  };

  const handleSubmit = () => {
    if (user && user.photoURL && user.uid && user.displayName) {
      if (tweet.trim().length > 0 || images.length > 0) {
        addTweet(user.photoURL, tweet, user.uid, user.displayName, images);
        setTweet("");
        setImages([])
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
        <div className="flex max-w-[600px] p-4 border-[1px] border-t-0 border-[#2f3336]">
          <img
            className="w-10 max-h-[40px] rounded-full mr-4"
            src={user?.photoURL ?? undefined}
            alt="profile Image"
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

            {images.length > 0 && (
              <div className="grid gap-3 max-h">
                {images.length > 0 &&
                  images.map((url) => (
                    <img
                      src={url}
                      className="rounded-2xl aspect-video object-cover w-full h-full"
                    />
                  ))}
              </div>
            )}

            <hr className="bg-[#2f3336] h-[1px] my-1 border-none" />

            <div className="flex justify-between items-center">
              <div>
                <div>
                  <Overlay show={imgOverlay}>
                    <div className="max-w-[600px] flex bg-black w-full h-max mt-12 rounded-3xl">
                      <button className="m-4" onClick={() => setImgOvberlay(false)}>
                        <i className="fa-solid fa-x"></i>
                      </button>
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={imgURL}
                        onChange={(e) => {
                          setImgURL(DOMPurify.sanitize(e.target.value));
                        }}
                        className="m-4 w-full text-xl outline-none resize-none max-h-20 bg-black border-b-[1px] border-[#2f3336]"
                      />
                      <button
                        onClick={handleImg}
                        className="bg-[#1d9bf0] px-4 py-1 m-1 rounded-3xl font-bold text-base"
                      >
                        Add
                      </button>
                    </div>
                  </Overlay>
                  <i
                    onClick={() => {
                      images.length < 1 && setImgOvberlay(true);
                    }}
                    className={`fa-regular fa-image p-2 rounded-full transition-all ${
                      images.length < 1
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
