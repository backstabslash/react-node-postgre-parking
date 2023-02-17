import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import axios from "../../axios";

const USER_REGEX = /^[A-z0-9-_]{4,23}/;
const PWD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
const PHONE_REGEX = /^(\+\d{1,2}\s)\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const FULLNAME_REGEX = /^[A-Za-z-\s]{10,50}$/;
const REGISTER_URL = "/user/sign_up";

const Register = () => {
  const userRef = useRef();

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [fullName, setFullName] = useState("");
  const [validFullName, setValidFullName] = useState(false);
  const [fullNameFocus, setFullNameFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  // const [phoneFocus, setPhoneFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  // const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  // const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidFullName(FULLNAME_REGEX.test(fullName));
  }, [fullName]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(REGISTER_URL, {
        username: user,
        password: pwd,
        full_name: fullName,
        phone_number: phone,
      });
      navigate("/sign_in");
    } catch (err) {
      console.log(err);
      if (!err?.response) setErrMsg("No server response");
      else if (err?.response?.status === 409) {
        if (err.response.data.detail.includes("phone_number"))
          setErrMsg("phone number already taken!");
        else if (err.response.data.detail.includes("username"))
          setErrMsg("username already taken!");
      } else setErrMsg("registration failed");
    }
  };

  return (
    <div className="app">
      <section className="sectionReg">
        <div className="regWrapper">
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <h1 className="formName">create a parking account</h1>
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
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <label
                htmlFor="username"
                className={`${user ? "labelHasContent" : ""}`}
              >
                username:
              </label>
              <p
                id="uidnote"
                className={
                  !userFocus && user && !validName
                    ? "instructions"
                    : "offscreen"
                }
              >
                must be at least 4 characters long, may include _
              </p>
            </div>
            <div className="inputContainer">
              <input
                type="text"
                id="full_name"
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="off"
                value={fullName}
                required
                aria-invalid={validFullName ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setFullNameFocus(true)}
                onBlur={() => setFullNameFocus(false)}
              />
              <label
                htmlFor="full_name"
                className={`${fullName ? "labelHasContent" : ""}`}
              >
                full name:
              </label>
              <p
                id="confirmnote"
                className={
                  !fullNameFocus && fullName && !validFullName
                    ? "instructions"
                    : "offscreen"
                }
              >
                must be at least 10 characters long
              </p>
            </div>
            <div className="inputContainer">
              <input
                type="text"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
                autoComplete="off"
                aria-invalid={validPhone ? "false" : "true"}
                aria-describedby="confirmnote"
                // onFocus={() => setPhoneFocus(true)}
                // onBlur={() => setPhoneFocus(false)}
              />
              <label
                htmlFor="phone"
                className={`${phone ? "labelHasContent" : ""}`}
              >
                phone number:
              </label>
              <p
                id="confirmnote"
                className={phone && !validPhone ? "instructions" : "offscreen"}
              >
                contact phone matching +xx (xxx)xxx-xxxx
              </p>
            </div>
            <div className="inputContainer">
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                // onFocus={() => setPwdFocus(true)}
                // onBlur={() => setPwdFocus(false)}
              />
              <label
                htmlFor="password"
                className={`${pwd ? "labelHasContent" : ""}`}
              >
                password:
              </label>
              <p
                id="pwdnote"
                className={pwd && !validPwd ? "instructions" : "offscreen"}
              >
                must be at least 8 characters long, must include uppercase
                letter, number and a special character (!@#$%^&*)
              </p>
            </div>
            <div className="inputContainer">
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                // onFocus={() => setMatchFocus(true)}
                // onBlur={() => setMatchFocus(false)}
              />
              <label
                htmlFor="confirm_pwd"
                className={`${matchPwd ? "labelHasContent" : ""}`}
              >
                confirm password:
              </label>
              <p
                id="confirmnote"
                className={
                  matchPwd && !validMatch ? "instructions" : "offscreen"
                }
              >
                must match the first password input field
              </p>
            </div>
            <button
              className="submitBtn"
              disabled={
                !validName ||
                !validPwd ||
                !validMatch ||
                !validFullName ||
                !validPhone
                  ? true
                  : false
              }
            >
              sign up
            </button>
          </form>
        </div>
        <p className="alreadyText">
          already have one?
          <br />
          <span>
            <a className="logInLink" href="sign_in">
              sign in
            </a>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Register;
