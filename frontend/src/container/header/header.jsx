import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/auth";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/header/logo.png";

function Header() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    dispatch(logout())
      .unwrap()
      .then(() => navigate("/sign_in"))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <nav>
        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link className="about-link" to="/about">
                About
              </Link>
            </li>
            <li>
              {" "}
              <Link className="testi-link" to="/testimonials">
                Reviews
              </Link>
            </li>
            <li>
              {" "}
              <Link className="team-link" to="/team">
                Our Team
              </Link>
            </li>
            <li>
              {" "}
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="navbar__buttons">
            {!auth.accessToken ? (
              <>
                <Link className="navbar__buttons__sign-in" to="/sign_in">
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
                  onClick={handleLogOut}
                  to="/sign_out"
                >
                  Log Out
                </Link>
                <Link className="navbar__buttons__register" to="/">
                  {auth.username}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
