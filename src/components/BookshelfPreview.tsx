import CustomButton from "./CustomButton";
import ArrowRight from "../assets/icons/Arrow right.svg";
import { useEffect, useState } from "react";
import { getBooks } from "../services/googleBooksAPI";

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

// interface BookshelfPreviewProps {
//   bookInfo: Book;
// }

const BookshelfPreview: React.FC = () => {
  const [books, setBooks] = useState<Book[] | []>([]);

  useEffect(() => {
    const get = async () => {
      const bookData = await getBooks(["zyTCAlFPjgYC", "RJxWIQOvoZUC"]);
      setBooks(bookData);
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
      {books.map((book) => {
        return (
          <div key={book.id} className="bookshelf-book-preview">
            <div className="book-thumbnail-wrap-sm">
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                loading="lazy"
                alt=""
                className="image"
              />
            </div>
            <div className="book-preview-content">
              <div className="book-title-wrap">
                <h4>{book.volumeInfo.title}</h4>
                <p className="text-burgundy-50">by Claire Keegan</p>
              </div>
              <div className="book-progress"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookshelfPreview;
