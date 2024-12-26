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

const ReadShelfPage = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [read, setRead] = useState<Book[] | []>([]);
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
        const readBooks = await getShelf(profileBooks.read);
        setRead(readBooks);
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
              classes="btn-green"
              hasIcon={true}
              iconLeading={true}
              iconSrc={ArrowLeft}
              textValue="Back"
              onClick={() => navigate(-1)}
            />

            {loading && <p>Loading books...</p>}
            {error && <p className="error-text">{error}</p>}

            {currentUser && uid && (
              <div className="shelf-buttons-container">
                <p className="overline">
                  {uid === currentUser.uid
                    ? "My shelves:"
                    : `${userData?.[0]?.firstName}'s shelves:`}
                </p>
                <ShelfButtons
                  currentlyReading
                  wantToRead
                  uid={uid}
                  currentUserId={currentUser.uid}
                />
              </div>
            )}
          </div>

          {!loading && !error && <SingleShelf type="Read" books={read} />}
        </div>
      </div>
    </main>
  );
};

export default ReadShelfPage;
