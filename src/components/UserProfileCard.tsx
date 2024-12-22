import { User } from "../types/User.types";
import { formatTimestamp } from "../assets/helpers/formatTimestamp";
import CustomButton from "./CustomButton";
import EditIcon from "../assets/icons/edit-icon.svg";
import ProfilePicPlaceholder from "../assets/images/profilepic-placeholder.jpg";
import calculateAge from "../assets/helpers/calculateAge";

interface UserProfileCardProps {
  user: User;
  currentUserId: string;
  uid: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, uid, currentUserId }) => {
  const isMyProfile = currentUserId === uid;

  const dateJoined = formatTimestamp(user.dateJoined);
  const age = user.dob ? calculateAge(user.dob) : "";

  return (
    <div className="user-profile-card">
      <div className="user-profile-img-wrap">
        <img
          src={user.photoUrls || ProfilePicPlaceholder}
          loading="lazy"
          alt="User profile photo"
          className="image"
        />
      </div>
      <div className="user-profile-information">
        <div>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <div className="overline text-burgundy-50 italic">Member since {dateJoined}</div>
        </div>
        {user.bio ? (
          <p className="p-large">{user.bio}</p>
        ) : (
          <p className="p-large">
            {`${user.firstName} has not written anything about themselves yet.`}
          </p>
        )}

        <div className="user-details">
          <p className="overline">
            AGE <span className="text-burgundy-50">{age}</span>
          </p>
          <p className="overline">
            Location <span className="text-burgundy-50">{user.location}</span>
          </p>
        </div>
      </div>
      {isMyProfile && (
        <CustomButton
          textValue="Edit profile"
          classes="btn-simple edit-profile-button"
          hasIcon={true}
          iconSrc={EditIcon}
          iconLeading={false}
          to="/profile/update-profile"
        />
      )}
    </div>
  );
};

export default UserProfileCard;
