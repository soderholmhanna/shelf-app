import { useNavigate, useParams } from "react-router";
import ArrowLeft from "../assets/icons/arrow-left-green.svg";
import CustomButton from "../components/CustomButton";
import Navigation from "../components/navigation/Navigation";
import PhotoPlaceholder from "../assets/images/profilepic-placeholder.jpg";
import { getBook } from "../services/googleBooksAPI";
import { useEffect, useState } from "react";
import { Book } from "../types/Book.types";
import { Form } from "react-bootstrap";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import useAuth from "../hooks/useAuth";
import useGetUserDoc from "../hooks/useGetUserDoc";
import { removeHTMLTags } from "../assets/helpers/removeHTMLtags";
import LoadingSpinner from "../components/LoadingSpinner";

const BookPage = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { currentUser } = useAuth();
  const { data: userData } = useGetUserDoc(currentUser?.uid);
  const [book, setBook] = useState<Book | null>(null);
  const [shelf, setShelf] = useState<"currentlyReading" | "wantToRead" | "read" | "none">("none");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = userData && userData.length > 0 ? userData[0]._id : null;
  const userDocRef = userId ? doc(db, "users", userId) : null;

  const description = removeHTMLTags(book?.volumeInfo.description);

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;
      setLoading(true);
      setError("");

      try {
        const currentBook = await getBook(bookId);
        setBook(currentBook);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(message);
        console.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      if (!userDocRef) return;

      try {
        if (userDocRef && bookId) {
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            const userBooks = userSnapshot.data().books;
            if (userBooks.currentlyReading.includes(bookId)) {
              setShelf("currentlyReading");
            } else if (userBooks.wantToRead.includes(bookId)) {
              setShelf("wantToRead");
            } else if (userBooks.read.includes(bookId)) {
              setShelf("read");
            } else {
              setShelf("none");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user books:", error);
      }
    };

    fetchUserBooks();
  }, [userDocRef, bookId]);

  const handleShelfChange = async (
    newShelf: "currentlyReading" | "wantToRead" | "read" | "none"
  ) => {
    if (!userDocRef || !bookId) return;

    try {
      setError(null);

      if (shelf !== "none") {
        await updateDoc(userDocRef, {
          [`books.${shelf}`]: arrayRemove(bookId),
        });
      }

      if (newShelf !== "none") {
        await updateDoc(userDocRef, {
          [`books.${newShelf}`]: arrayUnion(bookId),
        });
      }

      setShelf(newShelf);
    } catch (err) {
      console.error("Error updating shelf:", err);
      setError("Something went wrong while updating your shelf. Please try again!");
    }
  };

  return (
    <main>
      <div className="main-wrap">
        <Navigation />
        <div className="main-content">
          <div className="navigation-buttons">
            <CustomButton
              classes="btn-green overline"
              hasIcon={true}
              iconLeading={true}
              iconSrc={ArrowLeft}
              textValue="Back"
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="shelf-container">
            {loading && <LoadingSpinner />}
            {error && <p className="error-text">{error}</p>}

            {book && !error && !loading && (
              <div className="book-page-container">
                <div className="book-image-container">
                  <div className="book-thumbnail-wrap-large">
                    <img
                      src={book?.volumeInfo.imageLinks?.thumbnail || PhotoPlaceholder}
                      loading="lazy"
                      alt={book?.volumeInfo.title}
                      className="image"
                    />
                  </div>
                </div>

                <div className="bookpage-text-container">
                  <div className="book-title-wrap">
                    <h2>{book?.volumeInfo.title}</h2>
                    <p className="p-large text-burgundy-50">
                      by {book?.volumeInfo.authors?.join(", ")}
                    </p>
                  </div>
                  <Form.Select
                    aria-label="Add to shelf"
                    className="btn btn-burgundy"
                    value={shelf}
                    onChange={(e) => handleShelfChange(e.target.value as typeof shelf)}
                  >
                    <option value="none">Add to...</option>
                    <option value="currentlyReading">Currently reading</option>
                    <option value="wantToRead">Want to read</option>
                    <option value="read">Read</option>
                  </Form.Select>
                  <p className="p-large">{description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookPage;
