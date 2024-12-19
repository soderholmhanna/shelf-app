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

const ShelvesPage = () => {
  const navigate = useNavigate();
  const [currentlyReading, setCurrentlyReading] = useState<Book[] | []>([]);
  const [wantToRead, setWantToRead] = useState<Book[] | []>([]);
  const [read, setRead] = useState<Book[] | []>([]);
  const { currentUser } = useAuth();
  const { data: userData } = useGetUserDoc(currentUser?.uid);

  const profileBooks = userData?.[0].books;

  const getShelf = async (shelf: string[]) => {
    const bookData = await getBooks(shelf);
    return bookData;
  };

  useEffect(() => {
    if (profileBooks) {
      const fetchBooks = async () => {
        const currentlyReadingBooks = await getShelf(profileBooks.currentlyReading);
        const wantToReadBooks = await getShelf(profileBooks.wantToRead);
        const readBooks = await getShelf(profileBooks.read);

        setCurrentlyReading(currentlyReadingBooks);
        setWantToRead(wantToReadBooks);
        setRead(readBooks);
      };

      fetchBooks();
    }
  }, [profileBooks]);

  console.log({ profileBooks });

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
          {currentUser && profileBooks && (
            <>
              {currentlyReading.length > 0 && (
                <BookshelfPreview
                  type="Currently reading"
                  books={currentlyReading}
                  userId={currentUser.uid}
                />
              )}
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
