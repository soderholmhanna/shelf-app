import CustomButton from "./CustomButton";
import ArrowRight from "../assets/icons/Arrow right.svg";

const BookshelfPreview = () => {
  return (
    <div className="bookshelf-preview">
      <div className="shelf-title">
        <h2>Currently reading</h2>
        <CustomButton
          textValue="Open shelf"
          classes="btn-simple"
          hasIcon={true}
          iconSrc={ArrowRight}
          iconLeading={false}
          to="/currently-reading"
        />
      </div>
      <div className="bookshelf-book-preview">
        <div className="book-thumbnail-wrap-sm">
          <img
            src="src/assets/images/test-images/small-things-like-these2.jpg"
            loading="lazy"
            alt=""
            className="image"
          />
        </div>
        <div className="book-preview-content">
          <div className="book-title-wrap">
            <h4>Small things like these</h4>
            <p className="text-burgundy-50">by Claire Keegan</p>
          </div>
          <div className="book-progress"></div>
        </div>
      </div>
      <div className="bookshelf-book-preview">
        <div className="book-thumbnail-wrap-sm">
          <img
            src="src/assets/images/test-images/doktorglas.jpg"
            loading="lazy"
            alt=""
            className="image"
          />
        </div>
        <div className="book-preview-content">
          <div className="book-title-wrap">
            <h4>Doktor glas</h4>
            <p className="text-burgundy-50">by Hjalmar Söderberg</p>
          </div>
          <div className="book-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default BookshelfPreview;
