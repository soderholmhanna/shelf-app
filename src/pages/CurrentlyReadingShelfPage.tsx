import ArrowLeft from "../assets/icons/arrow-left-green.svg";
import { useNavigate, useParams } from "react-router";
import CustomButton from "../components/CustomButton";
import Navigation from "../components/navigation/Navigation";
import SingleShelf from "../components/SingleShelf";
import { useEffect, useState } from "react";
import { Book } from "../types/Book.types";
import useAuth from "../hooks/useAuth";
import useGetUserDoc from "../hooks/useGetUserDoc";
import { getBooks } from "../services/googleBooksAPI";
import ShelfButtons from "../components/ShelfButtons";
import LoadingSpinner from "../components/LoadingSpinner";

const CurrentlyReadingShelfPage = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [currentlyReading, setCurrentlyReading] = useState<Book[] | []>([]);
  const { currentUser } = useAuth();
  const { data: userData } = useGetUserDoc(uid);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const profileBooks = userData?.[0].books;

  const getShelf = async (shelf: string[]) => {
    const bookData = await getBooks(shelf);
    return bookData;
  };

  useEffect(() => {
    const fetchBooks = async () => {
      if (!profileBooks) return;

      setLoading(true);
      setError("");

      try {
        const currentlyReadingBooks = await getShelf(profileBooks.currentlyReading);
        setCurrentlyReading(currentlyReadingBooks);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(message);
        console.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [profileBooks]);

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
            {currentUser && uid && (
              <div className="shelf-buttons-container">
                <p className="overline">
                  {uid === currentUser.uid
                    ? "My shelves:"
                    : `${userData?.[0]?.firstName}'s shelves:`}
                </p>
                <ShelfButtons wantToRead read uid={uid} currentUserId={currentUser.uid} />
              </div>
            )}
          </div>

          {loading && <LoadingSpinner />}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && <SingleShelf type="Currently reading" books={currentlyReading} />}
        </div>
      </div>
    </main>
  );
};

export default CurrentlyReadingShelfPage;
