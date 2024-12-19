import { useNavigate, useParams } from "react-router";
import CustomButton from "../components/CustomButton";
import Navigation from "../components/navigation/Navigation";
import UserProfileCard from "../components/UserProfileCard";
import useAuth from "../hooks/useAuth";
import useGetUserDoc from "../hooks/useGetUserDoc";
import ArrowLeft from "../assets/icons/arrow-left-green.svg";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { uid } = useParams();

  // compare uid and currentuser id to check if nav "Profile" should be active

  console.log(uid);
  const navigate = useNavigate();

  const { data: userData } = useGetUserDoc(uid);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

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
          </div>
          {currentUser && userData && uid && (
            <UserProfileCard user={userData} uid={uid} currentUserId={currentUser.uid} />
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
