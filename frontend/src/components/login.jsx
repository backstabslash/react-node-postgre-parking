import { useRef, useState, useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/auth";
import { useNavigate } from "react-router-dom";

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
        if (!err) setErrMsg("No server response!");
        else if (err === 401) setErrMsg("Such user does not exist!");
        else setErrMsg("Login failed!");
      });
  };

  return (
    <section id="reg" className="log-section">
      <section className="container">
        <div className="login-content">
          <div className="login-content__header">
            <h4>Sign in to your account</h4>
          </div>
          <form
            className="login-content__form" //onSubmit={handleSubmit}
          >
            <p
              className={`login-content__form__error ${
                errMsg ? "errMsg" : "offScreen"
              }`}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="login-content__form__container">
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
                Username:
              </label>
            </div>
            <div className="login-content__form__container">
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
                Password:
              </label>
            </div>
            <button>Sign In</button>
          </form>
          <div className="login-content__footer">
            <h4>Don't have an account yet?</h4>
            <a href="sign_up">Register</a>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Login;
