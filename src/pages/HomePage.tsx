import BookshelfPreview from "../components/BookshelfPreview";
import Navigation from "../components/navigation/Navigation";
import WelcomeUser from "../components/WelcomeUser";

const HomePage = () => {
  return (
    <main>
      <div className="main-wrap">
        <Navigation />
        <div className="main-content">
          <WelcomeUser />
          <BookshelfPreview />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
