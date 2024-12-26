import CustomButton from "../components/CustomButton";
import Navigation from "../components/navigation/Navigation";
import ArrowLeft from "../assets/icons/arrow-left-green.svg";
import { useNavigate, useSearchParams } from "react-router";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import useSearchUsers from "../hooks/useSearchUsers";
import UserProfileCard from "../components/UserProfileCard";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

const PeoplePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
  const searchQuery = searchParams.get("q") || "";
  const { results, loading, error, searchUsers } = useSearchUsers();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = inputValue.trim();
    if (trimmedQuery === "") {
      alert("Please enter a search term.");
      return;
    }
    setSearchParams({ q: trimmedQuery });
    searchUsers(trimmedQuery, currentUser!.uid);
  };

  return (
    <main>
      <div className="main-wrap">
        <Navigation />
        <div className="main-content">
          <div className="inline-buttons">
            <CustomButton
              classes="btn-green overline"
              hasIcon={true}
              iconLeading={true}
              iconSrc={ArrowLeft}
              textValue="Back"
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="search-wrap">
            <div className="shelf-container">
              <h1>People</h1>
            </div>
            <div className="search-form">
              <Form onSubmit={handleSubmit} className="form-wrap">
                <InputGroup className="form">
                  <Form.Control
                    type="text"
                    placeholder="Search for users by name or email..."
                    className="input-field"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Searching..." : "Search"}
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </div>

          {error && (
            <div className="shelf-container">
              <p>{error}</p>
            </div>
          )}

          {loading && <LoadingSpinner />}

          {results.length > 0 && currentUser ? (
            <div className="shelf-container">
              <h1>Results</h1>
              {results.map((user) => (
                <UserProfileCard
                  user={user}
                  currentUserId={currentUser.uid}
                  uid={user.id}
                  type={"Search result"}
                />
              ))}
            </div>
          ) : (
            searchQuery && !loading && <p>No users found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default PeoplePage;
