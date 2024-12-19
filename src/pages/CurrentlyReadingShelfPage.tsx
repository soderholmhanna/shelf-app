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

const CurrentlyReadingShelfPage = () => {
  const navigate = useNavigate();
  const [currentlyReading, setCurrentlyReading] = useState<Book[] | []>([]);
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

        setCurrentlyReading(currentlyReadingBooks);
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
            <div className="shelf-buttons-container">
              <p className="overline">Other shelves:</p>
              <div className="shelf-buttons">
                <a href="#" className="btn btn-green w-inline-block">
                  <p className="overline">Want to read (43)</p>
                </a>
                <a href="#" className="btn btn-green w-inline-block">
                  <p className="overline">Read (34)</p>
                </a>
              </div>
            </div>
          </div>

          <SingleShelf type="Currently reading" books={currentlyReading} />
        </div>
      </div>
    </main>
  );
};

export default CurrentlyReadingShelfPage;
