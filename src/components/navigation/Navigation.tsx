import { NavLink } from "react-router";
import ArrowRight from "../../assets/icons/Arrow right.svg";
import Logo from "../../assets/logos/shelf-logo-burgundy.svg";
import Books from "../../assets/images/books-illustration.svg";
import useAuth from "../../hooks/useAuth";

const Navigation = () => {
  const { currentUser } = useAuth();

  const userId = currentUser?.uid;

  return (
    <nav id="nav">
      <a href="#">
        <img src={Logo} loading="lazy" alt="" />
      </a>
      <img src={Books} loading="lazy" alt="" />
      <div className="nav-links">
        <NavLink end to={"/home"} className="nav-link">
          <div>Home</div>
          <img src={ArrowRight} loading="lazy" alt="Arrow right" />
        </NavLink>
        <NavLink end to={"/search"} className="nav-link">
          <div>Search</div>
          <img src={ArrowRight} loading="lazy" alt="Arrow right" />
        </NavLink>
        <NavLink end to={`/profile/${userId}`} className="nav-link">
          <div>Profile</div>
          <img src={ArrowRight} alt="Arrow right" />
        </NavLink>
        <NavLink end to={`/shelves/${userId}`} className="nav-link">
          <div>My books</div>
          <img src={ArrowRight} loading="lazy" alt="Arrow right" />
        </NavLink>
        <NavLink end to={"/friends"} className="nav-link">
          <div>Friends</div>
          <img src={ArrowRight} loading="lazy" alt="Arrow right" />
        </NavLink>
        <NavLink end to={"/logout"} className="nav-link">
          <div>Log out</div>
          <img src={ArrowRight} loading="lazy" alt="Arrow right" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
