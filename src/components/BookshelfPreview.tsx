import CustomButton from "./CustomButton";
import ArrowRight from "../assets/icons/Arrow right.svg";
import { Book } from "../types/Book.types";
import BookshelfPreviewBookCard from "./BookshelfPreviewBookCard";

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
        books.slice(0, 3).map((book) => {
          return (
            <>
              <BookshelfPreviewBookCard book={book} key={book.id} />
            </>
          );
        })
      ) : (
        <div>No books yet!</div>
      )}
    </div>
  );
};

export default BookshelfPreview;
