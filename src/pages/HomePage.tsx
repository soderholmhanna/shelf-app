import BookshelfPreview from "../components/BookshelfPreview";
import Navigation from "../components/navigation/Navigation";
import WelcomeUser from "../components/WelcomeUser";
import useAuth from "../hooks/useAuth";
import useGetUserDoc from "../hooks/useGetUserDoc";

const HomePage = () => {
  const { currentUser, userName } = useAuth();
  const { data: userData } = useGetUserDoc(currentUser?.uid);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  console.log(currentUser, userName);

  return (
    <main>
      <div className="main-wrap">
        <Navigation />
        <div className="main-content">
          {currentUser && userData && <WelcomeUser user={userData} />}

          <BookshelfPreview />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
