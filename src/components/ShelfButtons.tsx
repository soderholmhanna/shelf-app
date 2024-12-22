import { Link } from "react-router";

interface ShelfButtonsProps {
  uid: string;
  currentlyReading?: boolean;
  wantToRead?: boolean;
  read?: boolean;
}

const ShelfButtons: React.FC<ShelfButtonsProps> = ({ uid, currentlyReading, wantToRead, read }) => {
  return (
    <div className="shelf-buttons">
      {currentlyReading && (
        <Link to={`/currently-reading/${uid}`} className="btn btn-green w-inline-block">
          <p className="overline">Currently reading</p>
        </Link>
      )}
      {wantToRead && (
        <Link to={`/want-to-read/${uid}`} className="btn btn-green w-inline-block">
          <p className="overline">Want to read</p>
        </Link>
      )}
      {read && (
        <Link to={`/read/${uid}`} className="btn btn-green w-inline-block">
          <p className="overline">Read</p>
        </Link>
      )}
    </div>
  );
};

export default ShelfButtons;
