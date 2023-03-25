import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../images/header/logo.png";
import { useEffect, useState } from "react";

function Header() {
  const [activeLink, setActiveLink] = useState("home");
  const [nav, setNav] = useState(false);

  const location = useLocation();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    dispatch(logout())
      .unwrap()
      .then(() => navigate("/sign_in"))
      .catch((err) => console.log(err));
  };

  const openNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    switch (currentPath) {
      case "/":
        setActiveLink("home");
        break;
      case "/about":
        setActiveLink("about");
        break;
      case "/reviews":
        setActiveLink("reviews");
        break;
      case "/team":
        setActiveLink("team");
        break;
      case "/contact":
        setActiveLink("contact");
        break;
      case "/sign_in":
        setActiveLink("signin");
        break;
      case "/sign_up":
        setActiveLink("signup");
        break;
      default:
        setActiveLink("");
    }
  }, [location]);

  return (
    <>
      <nav>
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link
                className={`${activeLink === "home" ? "active" : ""}`}
                onClick={openNav}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`${activeLink === "about" ? "active" : ""}`}
                onClick={openNav}
                to="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={`${activeLink === "reviews" ? "active" : ""}`}
                onClick={openNav}
                to="/reviews"
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link
                className={`${activeLink === "team" ? "active" : ""}`}
                onClick={openNav}
                to="/team"
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                className={`${activeLink === "contact" ? "active" : ""}`}
                onClick={openNav}
                to="/contact"
              >
                Contact
              </Link>
            </li>
            {!auth.accessToken ? (
              <>
                <li>
                  <Link
                    className={`${activeLink === "signin" ? "active" : ""}`}
                    onClick={openNav}
                    to="/sign_in"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${activeLink === "signup" ? "active" : ""}`}
                    onClick={openNav}
                    to="/sign_up"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className={`${activeLink === "signin" ? "active" : ""}`}
                    onClick={() => {
                      //handleLogOut();
                      openNav();
                    }}
                    to="/sign_out"
                  >
                    Log Out
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${activeLink === "signup" ? "active" : ""}`}
                    onClick={openNav}
                    to="/"
                  >
                    {auth.username}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link
                className={`home-link ${activeLink === "home" ? "active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className={`about-link ${
                  activeLink === "about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className={`reviews-link ${
                  activeLink === "reviews" ? "active" : ""
                }`}
                to="/reviews"
              >
                Reviews
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className={`team-link ${activeLink === "team" ? "active" : ""}`}
                to="/team"
              >
                Team
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className={`contact-link ${
                  activeLink === "contact" ? "active" : ""
                }`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="navbar__buttons">
            {!auth.accessToken ? (
              <>
                <Link
                  className={`navbar__buttons__sign-in ${
                    activeLink === "signin" ? "active" : ""
                  }`}
                  to="/sign_in"
                >
                  Sign In
                </Link>
                <Link className="navbar__buttons__register" to="/sign_up">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="navbar__buttons__sign-in"
                  // onClick={handleLogOut}
                  to="/sign_out"
                >
                  Log Out
                </Link>
                <Link className="navbar__buttons__register" to="/profile">
                  {auth.username}
                </Link>
              </>
            )}
          </div>

          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
