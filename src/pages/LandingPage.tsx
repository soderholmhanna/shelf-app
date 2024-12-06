import CustomButton from "../components/Button";
import ArrowUpRight from "../assets/icons/Arrow up-right.svg";
import ArrowRight from "../assets/icons/Arrow right.svg";
import ShelfLogoLarge from "../assets/logos/shelf-logo-large.svg";

const LandingPage = () => {
  return (
    <div className="homepage">
      <div className="homepage-half bg-burgundy">
        <div className="homepage-text-wrap">
          <img src={ShelfLogoLarge} alt="Shelf logo" id="homepage-large-logo" />
          <h3 className="text-white italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua |
          </h3>
          <div className="flex gap-4 pt-10">
            <CustomButton
              textValue="Sign up"
              hasIcon={true}
              iconLeading={false}
              bg="bg-white"
              end
              to="/signup"
              iconSrc={ArrowUpRight}
            />
            <CustomButton
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
          width="339"
          height="430"
          viewBox="0 0 339 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="369"
            height="64"
            transform="matrix(4.37114e-08 1 1 -4.37114e-08 128 60)"
            fill="#F2EFE2"
            stroke="#381519"
            stroke-linecap="round"
          />
          <rect
            x="0.5"
            y="0.5"
            width="369"
            height="64"
            transform="matrix(4.37114e-08 1 1 -4.37114e-08 64 30)"
            fill="#F2EFE2"
            stroke="#381519"
            stroke-linecap="round"
          />
          <rect
            x="0.5"
            y="0.5"
            width="369"
            height="64"
            transform="matrix(4.37114e-08 1 1 -4.37114e-08 2.18557e-08 -2.18557e-08)"
            fill="#F2EFE2"
            stroke="#381519"
            stroke-linecap="round"
          />
          <rect
            x="242.433"
            y="0.612372"
            width="369"
            height="64"
            transform="rotate(75 242.433 0.612372)"
            fill="#F2EFE2"
            stroke="#381519"
            stroke-linecap="round"
          />
          <circle cx="232.5" cy="365.5" r="39" fill="#ACD0D9" stroke="#381519" />
        </svg>
      </div>
    </div>
  );
};

export default LandingPage;
