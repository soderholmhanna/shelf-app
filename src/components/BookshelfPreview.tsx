import CustomButton from "./CustomButton";
import ArrowRight from "../assets/icons/Arrow right.svg";
import { useEffect, useState } from "react";
import { getBook } from "../services/googleBooksAPI";

export interface Book {
  volumeInfo: {
    title: string;
  };
}

// interface BookshelfPreviewProps {
//   bookInfo: Book;
// }

const BookshelfPreview: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const get = async () => {
      const bookData = await getBook("zyTCAlFPjgYC");
      console.log({ bookData });
      setBook(bookData);
    };
    get();
  }, []);
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
            <h4>{book?.volumeInfo.title}</h4>
            <p className="text-burgundy-50">by Claire Keegan</p>
          </div>
          <div className="book-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default BookshelfPreview;
