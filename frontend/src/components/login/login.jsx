import { useRef, useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/auth";

import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const dispatch = useAppDispatch();
  const userRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ username: user, password: pwd }))
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => {
        if (!err) setErrMsg("no server response");
        else if (err === 401) setErrMsg("such user does not exist");
        else setErrMsg("login failed");
      });
  };

  return (
    <div className="app">
      <section className="sectionReg">
        <div className="regWrapper">
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <h1 className="formName">sign in</h1>
          <form className="formReg" onSubmit={handleSubmit}>
            <div className="inputContainer">
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
              <label
                htmlFor="username"
                className={`${user ? "labelHasContent" : ""}`}
              >
                username:
              </label>
            </div>
            <div className="inputContainer">
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <label
                htmlFor="password"
                className={`${pwd ? "labelHasContent" : ""}`}
              >
                password:
              </label>
            </div>
            <button className="submitBtn">sign in</button>
          </form>
        </div>
        <p className="alreadyText">
          need an account?
          <br />
          <span className="line">
            <a className="logInLink" href="/sign_up">
              sign up
            </a>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;
