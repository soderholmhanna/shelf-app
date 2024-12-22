import React from "react";
import { Book } from "../types/Book.types";
import ProfilePicPlaceholder from "../assets/images/profilepic-placeholder.jpg";
import { Link } from "react-router";

interface BookshelfPreviewBookCardProps {
  book: Book;
}

const BookshelfPreviewBookCard: React.FC<BookshelfPreviewBookCardProps> = ({ book }) => {
  return (
    <div className="bookshelf-book-preview" key={book.id}>
      <Link to={`/book/${book.id}`}>
        <div className="book-thumbnail-wrap-sm">
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || ProfilePicPlaceholder}
            loading="lazy"
            alt={book.volumeInfo.title}
            className="image"
          />
        </div>
      </Link>
      <div className="book-preview-content">
        <div className="book-title-wrap">
          <Link to={`/book/${book.id}`}>
            <h4>{book.volumeInfo.title}</h4>
          </Link>

          <p className="text-burgundy-50">by {book.volumeInfo.authors.join(", ")}</p>
        </div>
        <div className="book-preview-description">
          <p>{book.volumeInfo.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookshelfPreviewBookCard;
