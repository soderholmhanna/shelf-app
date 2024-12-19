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

          <Route path="/shelves" element={<ShelvesPage />} />
          <Route path="/currently-reading/:uid" element={<CurrentlyReadingShelfPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Route>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
