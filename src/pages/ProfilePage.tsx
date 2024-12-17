import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import Navigation from "../components/navigation/Navigation";
import UserProfileCard from "../components/UserProfileCard";
import useAuth from "../hooks/useAuth";
import useGetUserDoc from "../hooks/useGetUserDoc";
import ArrowLeft from "../assets/icons/arrow-left-green.svg";

const ProfilePage = () => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const { data: userData } = useGetUserDoc(currentUser?.uid);
  const userId = userData && userData.length > 0 ? userData[0]._id : null;

  console.log({ userData });
  console.log({ userId });

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
          {userData && <UserProfileCard user={userData} />}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
