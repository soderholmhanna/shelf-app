import useAuth from "../hooks/useAuth";

const WelcomeUser = () => {
  const { userPhotoUrl, userName } = useAuth();

  return (
    <div className="user-welcome">
      <div className="user-welcome-img-wrap">
        <img
          src={userPhotoUrl || "src/assets/images/profilepic-placeholder.jpg"}
          loading="lazy"
          alt="User profile photo"
          className="image"
        />
      </div>
      <h1>
        Welcome back<span className="text-orange">,</span> {userName || "username"}!
      </h1>
    </div>
  );
};

export default WelcomeUser;
