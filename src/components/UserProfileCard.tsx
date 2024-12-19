import { User } from "../types/User.types";
import { formatTimestamp } from "../assets/helpers/formatTimestamp";
import CustomButton from "./CustomButton";
import EditIcon from "../assets/icons/edit-icon.svg";
import ProfilePicPlaceholder from "../assets/images/profilepic-placeholder.jpg";
import calculateAge from "../assets/helpers/calculateAge";

interface UserProfileCardProps {
  user: User[];
  currentUserId: string;
  uid: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, uid, currentUserId }) => {
  const profile = user[0];

  const isMyProfile = (authId: string, paramId: string) => {
    if (authId === paramId) {
      return true;
    }
  };

  const test = isMyProfile(uid, currentUserId);

  const dateJoined = formatTimestamp(profile.dateJoined);
  const age = profile.dob ? calculateAge(profile.dob) : "";

  return (
    <div className="user-profile-card">
      <div className="user-profile-img-wrap">
        <img
          src={profile.photoUrls || ProfilePicPlaceholder}
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
            AGE <span className="text-burgundy-50">{age}</span>
          </p>
          <p className="overline">
            Location <span className="text-burgundy-50">{profile.location}</span>
          </p>
        </div>
      </div>
      {test && (
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
