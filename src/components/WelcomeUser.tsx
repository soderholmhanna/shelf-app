import { User } from "../types/User.types";
import ProfilePicPlaceholder from "../assets/images/profilepic-placeholder.jpg";

interface WelcomeUserProps {
  user: User[];
}

const WelcomeUser: React.FC<WelcomeUserProps> = ({ user }) => {
  const profile = user[0];

  return (
    <div className="user-welcome">
      <div className="user-welcome-img-wrap">
        <img
          src={profile.photoUrls || ProfilePicPlaceholder}
          loading="lazy"
          alt="User profile photo"
          className="image"
        />
      </div>
      <h1>
        Welcome back<span className="text-orange">,</span> {profile.firstName || "username"}!
      </h1>
    </div>
  );
};

export default WelcomeUser;
