import { useEffect, useState } from "react";
import { usersColRef, handleFollow, auth } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

type ProfileHeadTypes = {
  uid: any;
  handleFunc?: any;
};

export default function ProfileHead({ uid, handleFunc }: ProfileHeadTypes) {
  const [users, loading, error] = useCollection(usersColRef);
  const [profile, setProfile] = useState<any>(null);
  const [docId, setDocId] = useState({ userDocId: "", profileDocId: "" });
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!loading && users) {
      // Filter users to find the matching profile by uid
      const matchedProfile = [...users.docs].find((u) => u.data().uid === uid);
      const userProfile = [...users.docs].find((u) => u.data().uid === user?.uid);

      // If a matching profile is found, set it to the state
      if (matchedProfile && userProfile) {
        setDocId({ userDocId: userProfile.id, profileDocId: matchedProfile.id });
        setProfile(matchedProfile.data()); // Assuming profile data is stored within .data()
        handleFunc(matchedProfile.data().userName)
      } else {
        setProfile(null); // Set to null if no matching profile is found
      }
    }
  }, [users, loading, uid]);

  const handleFollowBtn = () => {
    user && handleFollow(docId.userDocId, docId.profileDocId, user.uid, profile.uid);
  };

  if (profile === null || loading) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log(profile.following);

  return (
    <div className="border-x-[1px] border-[#2f3336]">
      <div className="flex justify-between">
        <div>
          <img className="rounded-full p-5" src={profile.photoURL} alt="profile image" />
          <p className="pl-4 pb-3 font-extrabold text-xl">{profile.userName}</p>
        </div>

        {user?.uid !== uid && (
          <div className="flex items-center mr-4">
            <button
              onClick={handleFollowBtn}
              className="bg-white px-5 py-2 rounded-full text-black font-semibold text-sm"
            >
              Follow
            </button>
          </div>
        )}
      </div>

      <div className="pl-4 pb-3 flex gap-4">
        <p className="text-sm">
          {profile.following.length} <span className="text-[#71767b]">Following</span>
        </p>
        <p className="text-sm">
          {profile.followers.length} <span className="text-[#71767b]">Followers</span>
        </p>
      </div>
    </div>
  );
}
