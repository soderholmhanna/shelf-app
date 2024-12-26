import ArrowLeft from "../assets/icons/arrow-left-green.svg";
import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import Navigation from "../components/navigation/Navigation";
import BookshelfPreview from "../components/BookshelfPreview";
import { useEffect, useState } from "react";
import { Book } from "../types/Book.types";
import useAuth from "../hooks/useAuth";
import useGetUserDoc from "../hooks/useGetUserDoc";
import { getBooks } from "../services/googleBooksAPI";
import LoadingSpinner from "../components/LoadingSpinner";

const ShelvesPage = () => {
  const navigate = useNavigate();
  const [currentlyReading, setCurrentlyReading] = useState<Book[] | []>([]);
  const [wantToRead, setWantToRead] = useState<Book[] | []>([]);
  const [read, setRead] = useState<Book[] | []>([]);
  const { currentUser } = useAuth();
  const { data: userData } = useGetUserDoc(currentUser?.uid);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const profileBooks = userData?.[0].books;

  const fetchShelfBooks = async (shelf: string[]): Promise<Book[]> => {
    return await getBooks(shelf);
  };

  useEffect(() => {
    const fetchShelves = async () => {
      if (!profileBooks) return;

      setLoading(true);
      setError("");

      try {
        const [currentlyReadingBooks, wantToReadBooks, readBooks] = await Promise.all([
          fetchShelfBooks(profileBooks.currentlyReading || []),
          fetchShelfBooks(profileBooks.wantToRead || []),
          fetchShelfBooks(profileBooks.read || []),
        ]);

        setCurrentlyReading(currentlyReadingBooks);
        setWantToRead(wantToReadBooks);
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

    fetchShelves();
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
          </div>

          {loading && <LoadingSpinner />}
          {error && <p className="error-text">{error}</p>}

          {currentUser && profileBooks && !loading && !error && (
            <>
              <BookshelfPreview
                type="Currently reading"
                books={currentlyReading}
                userId={currentUser.uid}
              />
              <BookshelfPreview type="Want to read" books={wantToRead} userId={currentUser.uid} />
              <BookshelfPreview type="Read" books={read} userId={currentUser.uid} />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default ShelvesPage;

// const fetchBooks = async () => {
//   const currentlyReadingBooks = await getShelf(profileBooks.currentlyReading);
//   const wantToReadBooks = await getShelf(profileBooks.wantToRead);
//   const readBooks = await getShelf(profileBooks.read);

//   setCurrentlyReading(currentlyReadingBooks);
//   setWantToRead(wantToReadBooks);
//   setRead(readBooks);
// };
