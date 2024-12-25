import { User } from "../types/User.types";
import { formatTimestamp } from "../assets/helpers/formatTimestamp";
import CustomButton from "./CustomButton";
import EditIcon from "../assets/icons/edit-icon.svg";
import PhotoPlaceholder from "../assets/images/profilepic-placeholder.jpg";
import calculateAge from "../assets/helpers/calculateAge";
import ArrowRight from "../assets/icons/Arrow right.svg";

interface UserProfileCardProps {
  user: User;
  currentUserId: string;
  uid: string;
  type: "Profile" | "Search result";
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, uid, currentUserId, type }) => {
  const isMyProfile = currentUserId === uid;
  const isSearchResult = type === "Search result";

  const dateJoined = formatTimestamp(user.dateJoined);
  const age = user.dob ? calculateAge(user.dob) : "";

  const cardClass = `user-profile-card ${type === "Search result" ? " bg-off-white" : ""}`;

  console.log({ user });

  return (
    <div className={cardClass}>
      <div className="user-profile-img-wrap">
        <img
          src={user.photoUrls || PhotoPlaceholder}
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
          {age !== "" && (
            <p className="overline">
              AGE <span className="text-burgundy-50">{age}</span>
            </p>
          )}
          {user.location !== "" && (
            <p className="overline">
              Location <span className="text-burgundy-50">{user.location}</span>
            </p>
          )}
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

      {isSearchResult && (
        <CustomButton
          textValue="View profile"
          classes="btn-simple edit-profile-button"
          hasIcon={true}
          iconSrc={ArrowRight}
          iconLeading={false}
          to={`/profile/${user.id}`}
        />
      )}
    </div>
  );
};

export default UserProfileCard;
