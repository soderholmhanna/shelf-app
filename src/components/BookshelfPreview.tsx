import CustomButton from "./CustomButton";
import ArrowRight from "../assets/icons/Arrow right.svg";
import { Book } from "../types/Book.types";
import ProfilePicPlaceholder from "../assets/images/profilepic-placeholder.jpg";

interface BookshelfPreviewProps {
  books: Book[] | [];
  type: "Currently reading" | "Want to read" | "Read";
  userId: string;
}

const BookshelfPreview: React.FC<BookshelfPreviewProps> = ({ books, type, userId }) => {
  const shelfLink =
    type === "Currently reading"
      ? "/currently-reading"
      : type === "Want to read"
      ? "/want-to-read"
      : "/read";

  return (
    <div className="bookshelf-preview">
      <div className="shelf-title">
        <h2>{type}</h2>
        <CustomButton
          textValue="Open shelf"
          classes="btn-simple"
          hasIcon={true}
          iconSrc={ArrowRight}
          iconLeading={false}
          to={`${shelfLink}/${userId}`}
        />
      </div>
      {books.length > 0 ? (
        books.map((book) => {
          return (
            <div key={book.id} className="bookshelf-book-preview">
              <div className="book-thumbnail-wrap-sm">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || ProfilePicPlaceholder}
                  loading="lazy"
                  alt={book.volumeInfo.title}
                  className="image"
                />
              </div>
              <div className="book-preview-content">
                <div className="book-title-wrap">
                  <h4>{book.volumeInfo.title}</h4>
                  <p className="text-burgundy-50">by {book.volumeInfo.authors.join(", ")}</p>
                </div>
                <div className="book-progress"></div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No books yet!</div>
      )}
    </div>
  );
};

export default BookshelfPreview;
