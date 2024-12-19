import ArrowLeft from "../assets/icons/arrow-left-green.svg";
import { useNavigate } from "react-router";

import CustomButton from "../components/CustomButton";
import Navigation from "../components/navigation/Navigation";
import BookshelfPreview from "../components/BookshelfPreview";

const ShelvesPage = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="main-wrap">
        <Navigation />
        <div className="main-content">
          <div className="navigation-buttons">
            <CustomButton
              classes="btn-green"
              hasIcon={true}
              iconLeading={true}
              iconSrc={ArrowLeft}
              textValue="Back"
              onClick={() => navigate(-1)}
            />
          </div>
          <BookshelfPreview />
          <BookshelfPreview />
          <BookshelfPreview />
        </div>
      </div>
    </main>
  );
};

export default ShelvesPage;
