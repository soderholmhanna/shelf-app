import { useEffect, useState } from "react";
import BookshelfPreview from "../components/BookshelfPreview";
import Navigation from "../components/navigation/Navigation";
import WelcomeUser from "../components/WelcomeUser";
import useAuth from "../hooks/useAuth";
import useGetUserDoc from "../hooks/useGetUserDoc";
import { getBooks } from "../services/googleBooksAPI";
import { Book } from "../types/Book.types";
import ShelfButtons from "../components/ShelfButtons";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const { currentUser } = useAuth();
  const { data: userData } = useGetUserDoc(currentUser?.uid);
  const [currentlyReading, setCurrentlyReading] = useState<Book[] | []>([]);
  const profileBooks = userData?.[0].books;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          {loading && <LoadingSpinner />}
          {error && <p className="error-text">{error}</p>}

          {currentUser && userData && !error && !loading && (
            <>
              <WelcomeUser user={userData} />
              <BookshelfPreview
                type="Currently reading"
                books={currentlyReading}
                userId={currentUser.uid}
              />
              <div className="shelf-buttons-container">
                <p className="overline">Other shelves:</p>
                <ShelfButtons
                  wantToRead
                  read
                  uid={currentUser.uid}
                  currentUserId={currentUser.uid}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
