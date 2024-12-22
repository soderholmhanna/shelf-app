import { useEffect, useState } from "react";
import BookshelfPreview from "../components/BookshelfPreview";
import Navigation from "../components/navigation/Navigation";
import WelcomeUser from "../components/WelcomeUser";
import useAuth from "../hooks/useAuth";
import useGetUserDoc from "../hooks/useGetUserDoc";
import { getBooks } from "../services/googleBooksAPI";
import { Book } from "../types/Book.types";
import ShelfButtons from "../components/ShelfButtons";

const HomePage = () => {
  const { currentUser } = useAuth();
  const { data: userData } = useGetUserDoc(currentUser?.uid);
  const [currentlyReading, setCurrentlyReading] = useState<Book[] | []>([]);
  const profileBooks = userData?.[0].books;

  const getShelf = async (shelf: string[]) => {
    const bookData = await getBooks(shelf);
    return bookData;
  };

  useEffect(() => {
    if (profileBooks) {
      const fetchBooks = async () => {
        const currentlyReadingBooks = await getShelf(profileBooks.currentlyReading);
        setCurrentlyReading(currentlyReadingBooks);
      };

      fetchBooks();
    }
  }, [profileBooks]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="main-wrap">
        <Navigation />
        <div className="main-content">
          {currentUser && userData && (
            <>
              <WelcomeUser user={userData} />
              <BookshelfPreview
                type="Currently reading"
                books={currentlyReading}
                userId={currentUser.uid}
              />
              <div className="shelf-buttons-container">
                <p className="overline">Other shelves:</p>
                <ShelfButtons wantToRead read uid={currentUser.uid} />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
