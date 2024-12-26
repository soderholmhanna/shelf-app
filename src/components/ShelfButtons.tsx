import { Link } from "react-router";

interface ShelfButtonsProps {
  currentUserId: string;
  uid: string;
  currentlyReading?: boolean;
  wantToRead?: boolean;
  read?: boolean;
}

const ShelfButtons: React.FC<ShelfButtonsProps> = ({
  currentUserId,
  uid,
  currentlyReading,
  wantToRead,
  read,
}) => {
  return (
    <div className="shelf-buttons">
      {currentlyReading && (
        <Link
          to={`/${
            currentUserId === uid
              ? `currently-reading/${currentUserId}`
              : `currently-reading/${uid}`
          }`}
          className="btn btn-green"
        >
          <p className="overline">Currently reading</p>
        </Link>
      )}
      {wantToRead && (
        <Link
          to={`/${currentUserId === uid ? `want-to-read/${currentUserId}` : `want-to-read/${uid}`}`}
          className="btn btn-green"
        >
          <p className="overline">Want to read</p>
        </Link>
      )}
      {read && (
        <Link
          to={`/${currentUserId === uid ? `read/${currentUserId}` : `read/${uid}`}`}
          className="btn btn-green"
        >
          <p className="overline">Read</p>
        </Link>
      )}
    </div>
  );
};

export default ShelfButtons;
