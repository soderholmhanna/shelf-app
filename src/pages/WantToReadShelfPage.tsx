import ArrowLeft from "../assets/icons/arrow-left-green.svg";
import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import Navigation from "../components/navigation/Navigation";
import SingleShelf from "../components/SingleShelf";
import { useEffect, useState } from "react";
import { Book } from "../types/Book.types";
import useAuth from "../hooks/useAuth";
import useGetUserDoc from "../hooks/useGetUserDoc";
import { getBooks } from "../services/googleBooksAPI";
import ShelfButtons from "../components/ShelfButtons";

const WantToReadShelfPage = () => {
  const navigate = useNavigate();
  const [wantToRead, setWantToRead] = useState<Book[] | []>([]);
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
        const wantToReadBooks = await getShelf(profileBooks.wantToRead);

        setWantToRead(wantToReadBooks);
      };

      fetchBooks();
    }
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
            {currentUser && (
              <div className="shelf-buttons-container">
                <p className="overline">Other shelves:</p>
                <ShelfButtons currentlyReading read uid={currentUser.uid} />
              </div>
            )}
          </div>
          <SingleShelf type="Want to read" books={wantToRead} />
        </div>
      </div>
    </main>
  );
};

export default WantToReadShelfPage;
