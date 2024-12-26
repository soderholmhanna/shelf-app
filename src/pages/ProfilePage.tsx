import { Link, useNavigate, useParams } from "react-router";
import CustomButton from "../components/CustomButton";
import Navigation from "../components/navigation/Navigation";
import UserProfileCard from "../components/UserProfileCard";
import useAuth from "../hooks/useAuth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import useGetUserDoc from "../hooks/useGetUserDoc";
import ArrowLeft from "../assets/icons/arrow-left-green.svg";
import AddIcon from "../assets/icons/add.svg";
import { db } from "../services/firebase";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { uid } = useParams();
  const navigate = useNavigate();
  const { data: currentUserData } = useGetUserDoc(currentUser?.uid);
  const { data: profileData } = useGetUserDoc(uid);
  const [isFollowing, setIsFollowing] = useState(false);

  console.log({ isFollowing });

  const userData = profileData?.[0];
  const currentUserID = currentUserData?.[0]._id;

  const isMyProfile = currentUser?.uid === uid;

  console.log({ userData });

  const handleFollow = async () => {
    if (!currentUser || !uid || !currentUserID) return;

    try {
      const userDocRef = doc(db, "users", currentUserID);
      await updateDoc(userDocRef, {
        following: arrayUnion(uid),
      });
      console.log(`Now following user with uid: ${uid}`);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    if (!currentUser || !uid || !currentUserID) return;

    try {
      const userDocRef = doc(db, "users", currentUserID);
      await updateDoc(userDocRef, {
        following: arrayRemove(uid),
      });
      setIsFollowing(false);
      console.log(`Unfollowed user with uid: ${uid}`);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  useEffect(() => {
    if (currentUserData && currentUserData[0].following && uid) {
      setIsFollowing(currentUserData[0].following.includes(uid));
    }
  }, [currentUserData, uid]);

  return (
    <main>
      <div className="main-wrap">
        <Navigation />
        <div className="main-content">
          <div className="inline-buttons">
            <CustomButton
              classes="btn-green"
              hasIcon={true}
              iconLeading={true}
              iconSrc={ArrowLeft}
              textValue="Back"
              onClick={() => navigate(-1)}
            />

            {!isMyProfile && (
              <>
                {isFollowing ? (
                  <CustomButton
                    classes="btn-orange-outline"
                    hasIcon={false}
                    textValue="Unfollow"
                    onClick={handleUnfollow}
                  />
                ) : (
                  <CustomButton
                    classes="btn-orange"
                    hasIcon={true}
                    iconLeading={false}
                    iconSrc={AddIcon}
                    textValue="Follow"
                    onClick={handleFollow}
                  />
                )}
              </>
            )}
          </div>

          {currentUser && userData && uid && (
            <>
              <UserProfileCard
                user={userData}
                uid={uid}
                currentUserId={currentUser.uid}
                type={"Profile"}
              />
              <div className="shelf-buttons-container">
                <p className="overline">
                  {isMyProfile ? "My shelves:" : `${userData.firstName}'s shelves:`}
                </p>
                <div className="shelf-buttons">
                  <Link to={`/currently-reading/${uid}`} className="btn btn-green">
                    <p className="overline">Currently reading</p>
                  </Link>
                  <Link to={`/want-to-read/${uid}`} className="btn btn-green">
                    <p className="overline">Want to read</p>
                  </Link>
                  <Link to={`/read/${uid}`} className="btn btn-green">
                    <p className="overline">Read</p>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
