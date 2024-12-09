import CustomButton from "../components/CustomButton";
import ArrowRight from "../assets/icons/Arrow right.svg";

const HomePage = () => {
  return (
    <div>
      <CustomButton
        textValue="Log out"
        hasIcon={true}
        iconLeading={false}
        bg="btn-white"
        end
        to="/logout"
        iconSrc={ArrowRight}
      />
    </div>
  );
};

export default HomePage;
