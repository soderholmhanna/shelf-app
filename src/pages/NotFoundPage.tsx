import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import Navigation from "../components/navigation/Navigation";
import ArrowLeft from "../assets/icons/arrow-left-green.svg";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="main-wrap">
        <Navigation />
        <div className="main-content">
          <div className="inline-buttons">
            <CustomButton
              classes="btn-green"
              hasIcon={true}
              iconLeading={true}
              iconSrc={ArrowLeft}
              textValue="Back"
              onClick={() => navigate(-1)}
            />
          </div>
          <h1>Page not found!</h1>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
