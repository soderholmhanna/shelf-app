import { Link, useNavigate, useParams } from "react-router";
import CustomButton from "../components/CustomButton";
import Navigation from "../components/navigation/Navigation";
import UserProfileCard from "../components/UserProfileCard";
import useAuth from "../hooks/useAuth";
import useGetUserDoc from "../hooks/useGetUserDoc";
import ArrowLeft from "../assets/icons/arrow-left-green.svg";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { uid } = useParams();

  // compare uid and currentuser id to check if nav "Profile" should be active?

  console.log(uid);
  const navigate = useNavigate();

  const { data } = useGetUserDoc(uid);
  const userData = data?.[0];

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
            <>
              <UserProfileCard user={userData} uid={uid} currentUserId={currentUser.uid} />
              <div className="shelf-buttons-container">
                <p className="overline">{currentUser.displayName}'s shelves:</p>
                <div className="shelf-buttons">
                  <Link to={`/currently-reading/${uid}`} className="btn btn-green w-inline-block">
                    <p className="overline">Currently reading</p>
                  </Link>
                  <Link to={`/want-to-read/${uid}`} className="btn btn-green w-inline-block">
                    <p className="overline">Want to read</p>
                  </Link>
                  <Link to={`/read/${uid}`} className="btn btn-green w-inline-block">
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
