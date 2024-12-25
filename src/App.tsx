import "./assets/scss/App.scss";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LogoutPage from "./pages/LogoutPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ShelvesPage from "./pages/ShelvesPage";
import CurrentlyReadingShelfPage from "./pages/CurrentlyReadingShelfPage";
import BookPage from "./pages/BookPage";
import WantToReadShelfPage from "./pages/WantToReadShelfPage";
import ReadShelfPage from "./pages/ReadShelfPage";
import SearchPage from "./pages/SearchPage";
import PeoplePage from "./pages/PeoplePage";

const App = () => {
  return (
    <div id="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:uid" element={<ProfilePage />} />
          <Route path="/profile/update-profile" element={<UpdateProfilePage />} />

          <Route path="/search" element={<SearchPage />} />
          <Route path="/people" element={<PeoplePage />} />

          <Route path="/shelves/:uid" element={<ShelvesPage />} />
          <Route path="/currently-reading/:uid" element={<CurrentlyReadingShelfPage />} />
          <Route path="/want-to-read/:uid" element={<WantToReadShelfPage />} />
          <Route path="/read/:uid" element={<ReadShelfPage />} />
          <Route path="/book/:bookId" element={<BookPage />} />

          <Route path="/logout" element={<LogoutPage />} />
        </Route>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
