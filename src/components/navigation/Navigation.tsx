import { Link, NavLink } from "react-router";
import ArrowRight from "../../assets/icons/Arrow right.svg";
import Logo from "../../assets/logos/shelf-logo-burgundy.svg";
import Books from "../../assets/images/books-illustration.svg";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Navigation = () => {
  const { currentUser } = useAuth();
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth > 991);

  console.log({ isDesktop });

  const userId = currentUser?.uid;

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 991);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isDesktop && (
        <nav id="nav">
          <NavLink end to="/home">
            <img src={Logo} loading="lazy" alt="Shelf logo" />
          </NavLink>
          <img src={Books} loading="lazy" alt="" />
          <div className="nav-links">
            <NavLink end to={"/home"} className="nav-link">
              <div>Home</div>
              <img src={ArrowRight} loading="lazy" alt="Arrow right" />
            </NavLink>
            <NavLink end to={"/search"} className="nav-link">
              <div>Search</div>
              <img src={ArrowRight} loading="lazy" alt="Arrow right" />
            </NavLink>
            <NavLink end to={`/profile/${userId}`} className="nav-link">
              <div>Profile</div>
              <img src={ArrowRight} alt="Arrow right" />
            </NavLink>
            <NavLink end to={`/shelves/${userId}`} className="nav-link">
              <div>My books</div>
              <img src={ArrowRight} loading="lazy" alt="Arrow right" />
            </NavLink>
            <NavLink end to={"/people"} className="nav-link">
              <div>People</div>
              <img src={ArrowRight} loading="lazy" alt="Arrow right" />
            </NavLink>
            <NavLink end to={"/logout"} className="nav-link">
              <div>Log out</div>
              <img src={ArrowRight} loading="lazy" alt="Arrow right" />
            </NavLink>
          </div>
        </nav>
      )}

      {!isDesktop && (
        <Navbar expand="lg" className="bg-body-tertiary" id="tabmob-nav">
          <Container className="nav-container">
            <Navbar.Brand as={Link} to="/home" className="logo">
              <img src={Logo} loading="lazy" alt="Shelf logo" id="tabmob-logo" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbar-toggle" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={NavLink} end to="/home">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} end to="/search">
                  Search
                </Nav.Link>
                <Nav.Link as={NavLink} end to={`/profile/${userId}`}>
                  Profile
                </Nav.Link>
                <Nav.Link as={NavLink} end to={`/shelves/${userId}`}>
                  My Books
                </Nav.Link>
                <Nav.Link as={NavLink} end to="/people">
                  People
                </Nav.Link>
                <Nav.Link as={NavLink} end to="/logout">
                  Log out
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Navigation;
