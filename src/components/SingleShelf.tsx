import { Book } from "../types/Book.types";
import PhotoPlaceholder from "../assets/images/profilepic-placeholder.jpg";
import { Link } from "react-router";

interface SingleShelfProps {
  type: "Currently reading" | "Want to read" | "Read";
  books: Book[] | [];
}

const SingleShelf: React.FC<SingleShelfProps> = ({ type, books }) => {
  console.log({ books });
  return (
    <div className="shelf-container">
      <h2>{type}</h2>
      <div className="shelf-books">
        {books.length > 0 ? (
          books.map((book) => {
            return (
              <div key={book.id} className="book-card">
                <Link to={`/book/${book.id}`}>
                  <div className="book-thumbnail-wrap-med">
                    <img
                      src={book.volumeInfo.imageLinks?.thumbnail || PhotoPlaceholder}
                      loading="lazy"
                      alt={book.volumeInfo.title}
                      className="image"
                    />
                  </div>
                </Link>
                <div className="book-title-wrap">
                  <Link to={`/book/${book.id}`}>
                    <h4>{book.volumeInfo.title}</h4>
                  </Link>
                  <p className="text-burgundy-50">by {book.volumeInfo.authors.join(", ")}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div>No books yet!</div>
        )}
      </div>
    </div>
  );
};

export default SingleShelf;
