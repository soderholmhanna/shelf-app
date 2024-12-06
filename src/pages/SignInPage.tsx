import Button from "../components/Button";
import ArrowUpRight from "../assets/icons/Arrow up-right.svg";
import ArrowRight from "../assets/icons/Arrow right.svg";
import HomePageNavigation from "../components/navigation/HomePageNavigation";
import ShelfLogoLarge from "../assets/logos/shelf-logo-large.svg";

const SignInPage = () => {
  return (
    <div className="homepage">
      <div className="homepage-half bg-burgundy relative">
        <HomePageNavigation />
        <div className="homepage-text-wrap">
          <img src={ShelfLogoLarge} alt="Shelf logo" id="homepage-large-logo" />
          <h3 className="text-white italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua |
          </h3>
          <div className="flex gap-4 pt-10">
            <Button
              textValue="Sign up"
              hasIcon={true}
              iconLeading={false}
              bg="bg-white"
              end
              to="/signup"
              iconSrc={ArrowUpRight}
            />
            <Button
              textValue="Sign in"
              hasIcon={true}
              bg="bg-white"
              end
              to="/signin"
              iconLeading={false}
              iconSrc={ArrowRight}
            />
          </div>
        </div>
      </div>

      <div className="homepage-half homepage-image bg-white">
        <svg
          width="127"
          height="358"
          viewBox="0 0 127 358"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="63.5" y1="340.037" x2="63.5" y2="18.0001" stroke="black" />
          <path d="M63.5 18.1296V18.1296C63.5 8.6692 71.1692 1 80.6296 1H82" stroke="black" />
          <path d="M82 1H127" stroke="black" />
          <path d="M63.5 18.1296V18.1296C63.5 8.6692 55.8308 1 46.3704 1H45" stroke="black" />
          <path d="M45 1H3.57628e-07" stroke="black" />
          <path d="M63.5 340V340C63.5 349.46 71.1692 357.13 80.6296 357.13H82" stroke="black" />
          <path d="M82 357.13H127" stroke="black" />
          <path d="M63.5 340V340C63.5 349.46 55.8308 357.13 46.3704 357.13H45" stroke="black" />
          <path d="M45 357.13H3.57628e-07" stroke="black" />
          <line x1="25" y1="178.5" x2="102" y2="178.5" stroke="black" />
        </svg>
      </div>
    </div>
  );
};

export default SignInPage;
