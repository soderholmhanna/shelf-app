import ArrowLeft from "../assets/icons/arrow-left-green.svg";
import { useNavigate, useParams } from "react-router";
import CustomButton from "../components/CustomButton";
import Navigation from "../components/navigation/Navigation";

const CurrentlyReadingShelfPage = () => {
  const { uid } = useParams();
  const navigate = useNavigate();

  console.log({ uid });

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
            <div className="shelf-buttons-container">
              <p className="overline">Other shelves:</p>
              <div className="shelf-buttons">
                <a href="#" className="btn btn-green w-inline-block">
                  <p className="overline">Want to read (43)</p>
                </a>
                <a href="#" className="btn btn-green w-inline-block">
                  <p className="overline">Read (34)</p>
                </a>
              </div>
            </div>
          </div>

          <div className="shelf-container">
            <h2>Want to read</h2>
            <div className="shelf-books">
              <div className="book-card">
                <div className="book-thumbnail-wrap-med">
                  <img
                    src="src/assets/images/test-images/din-stund-på-jorden.jpg"
                    loading="lazy"
                    alt=""
                    className="image"
                  />
                </div>
                <div className="book-title-wrap">
                  <h4>Din stund på jorden</h4>
                  <p className="text-burgundy-50">by Vilhelm Moberg</p>
                </div>
              </div>

              <div className="book-card">
                <div className="book-thumbnail-wrap-med">
                  <img
                    src="src/assets/images/test-images/din-stund-på-jorden.jpg"
                    loading="lazy"
                    alt=""
                    className="image"
                  />
                </div>
                <div className="book-title-wrap">
                  <h4>Din stund på jorden</h4>
                  <p className="text-burgundy-50">by Vilhelm Moberg</p>
                </div>
              </div>

              <div className="book-card">
                <div className="book-thumbnail-wrap-med">
                  <img
                    src="src/assets/images/test-images/din-stund-på-jorden.jpg"
                    loading="lazy"
                    alt=""
                    className="image"
                  />
                </div>
                <div className="book-title-wrap">
                  <h4>Din stund på jorden</h4>
                  <p className="text-burgundy-50">by Vilhelm Moberg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CurrentlyReadingShelfPage;
