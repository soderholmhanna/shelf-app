import CustomButton from "../components/CustomButton";
import Navigation from "../components/navigation/Navigation";
import ArrowLeft from "../assets/icons/arrow-left-green.svg";
import { useNavigate, useSearchParams } from "react-router";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { SearchBooks } from "../types/Book.types";
import { searchBooks } from "../services/googleBooksAPI";
import SingleShelf from "../components/SingleShelf";
import LoadingSpinner from "../components/LoadingSpinner";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<SearchBooks | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState(searchParams.get("q") || ""); //

  const searchQuery = searchParams.get("q") || "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = inputValue.trim();
    if (trimmedQuery === "") {
      setError("Please enter a search term.");
      return;
    }

    setSearchParams({ q: trimmedQuery });
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery) return;

      setLoading(true);
      setError("");

      try {
        const data = await searchBooks(searchQuery);

        if (data) {
          setResults(data);
        } else {
          setResults(null);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong, try again.";
        setError(errorMessage);
        console.error(errorMessage);
      }
      setLoading(false);
    };

    fetchResults();
  }, [searchQuery]);

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
              <h1>Search</h1>
            </div>
            <div className="search-form">
              <Form onSubmit={handleSubmit} className="form-wrap">
                <InputGroup className="form">
                  <Form.Control
                    type="text"
                    placeholder="Search for books, authors or categories..."
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

          {results && <SingleShelf type="Search" books={results.items} searchQuery={searchQuery} />}
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
