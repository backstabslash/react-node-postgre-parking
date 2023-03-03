import React from "react";
import "./header.css";
import axios from "../../axios";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setAuth } from "../../redux/auth";

function Header() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    dispatch(
      setAuth({ username: null, role: "connect_user", accessToken: null })
    );
    try {
      const response = await axios("user/sign_out", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="headerWrapper">
      <div className="content">
        <a className="header--button-parking" href="/">
          super parking
        </a>
        {auth.role === "client" || auth.role === "administrator" ? (
          <>
            <div className="header--personal">
              <a className="header--button-username" href="/">
                {auth.username}
              </a>
            </div>
            <button onClick={handleLogOut} className="header--button-logout">
              log out
            </button>
          </>
        ) : (
          <div className="sign-split">
            <a className="header--button-username" href="/sign_up">
              sign up
            </a>{" "}
            /{" "}
            <a className="header--button-username" href="/sign_in">
              log in
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
