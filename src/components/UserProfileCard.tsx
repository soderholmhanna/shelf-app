import { User } from "../types/User.types";
import { formatTimestamp } from "../assets/helpers/formatTimestamp";
import CustomButton from "./CustomButton";
import EditIcon from "../assets/icons/edit-icon.svg";

interface UserProfileCardProps {
  user: User[];
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  const profile = user[0];

  const dateJoined = formatTimestamp(profile.dateJoined);

  return (
    <div className="user-profile-card">
      <div className="user-profile-img-wrap">
        <img
          src={profile.photoUrls || "src/assets/images/profilepic-placeholder.jpg"}
          loading="lazy"
          alt="User profile photo"
        />
      </div>
      <div className="user-profile-information">
        <div>
          <h2>
            {profile.firstName} {profile.lastName}
          </h2>
          <div className="overline text-burgundy-50 italic">Member since {dateJoined}</div>
        </div>
        {profile.bio ? (
          <p className="p-large">{profile.bio}</p>
        ) : (
          <p className="p-large">
            {`${profile.firstName} has not written anything about themselves yet.`}
          </p>
        )}

        <div className="user-details">
          <p className="overline">
            AGE <span className="text-burgundy-50">28</span>
          </p>
          <p className="overline">
            Location <span className="text-burgundy-50">Sweden</span>
          </p>
        </div>
      </div>
      <CustomButton
        textValue="Edit profile"
        classes="btn-simple edit-profile-button"
        hasIcon={true}
        iconSrc={EditIcon}
        iconLeading={false}
        to="/update-profile"
      />
    </div>
  );
};

export default UserProfileCard;
