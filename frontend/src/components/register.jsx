import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { register } from "../redux/auth";

const USER_REGEX = /^[A-z0-9-_]{4,15}/;
const PWD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
const PHONE_REGEX = /^(\+\d{1,2}\s)\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const FULLNAME_REGEX = /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/;

const Register = () => {
  const userRef = useRef();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [fullName, setFullName] = useState("");
  const [validFullName, setValidFullName] = useState(false);
  const [fullNameFocus, setFullNameFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

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
  }, [user, pwd, matchPwd, phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      register({
        username: user,
        password: pwd,
        full_name: fullName,
        phone_number: phone,
      })
    )
      .unwrap()
      .then(() => navigate("/sign_in"))
      .catch((err) => {
        const { status, error } = err;
        if (!status) setErrMsg("No server response!");
        else if (status === 409) {
          if (error.error.includes("phone_number"))
            setErrMsg("Phone number already taken!");
          else if (error.error.includes("username"))
            setErrMsg("Username already taken!");
        } else setErrMsg("Registration failed!");
      });
  };

  return (
    <section id="reg" className="reg-section">
      <section className="container">
        <div className="register-content">
          <div className="register-content__header">
            <h4>Set up your account</h4>
          </div>
          <form className="register-content__form" onSubmit={handleSubmit}>
            <p
              className={`register-content__form__error ${
                errMsg ? "errMsg" : "offScreen"
              }`}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="register-content__form__container">
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
                Username:
              </label>
              <p
                id="uidnote"
                className={
                  !userFocus && user && !validName
                    ? "instructions"
                    : "offScreen"
                }
              >
                Must be at least 4 characters long(&lt;15), may include _
              </p>
            </div>
            <div className="register-content__form__container">
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
                Full name:
              </label>
              <p
                id="confirmnote"
                className={
                  !fullNameFocus && fullName && !validFullName
                    ? "instructions"
                    : "offScreen"
                }
              >
                First and last name with a space in between with the first
                letter of each name capitalized
              </p>
            </div>
            <div className="register-content__form__container">
              <input
                type="text"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
                autoComplete="off"
                aria-invalid={validPhone ? "false" : "true"}
                aria-describedby="confirmnote"
              />
              <label
                htmlFor="phone"
                className={`${phone ? "labelHasContent" : ""}`}
              >
                Phone number:
              </label>
              <p
                id="confirmnote"
                className={phone && !validPhone ? "instructions" : "offScreen"}
              >
                Contact phone matching +xx xxx xxx-xxxx
              </p>
            </div>
            <div className="register-content__form__container">
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
              />
              <label
                htmlFor="password"
                className={`${pwd ? "labelHasContent" : ""}`}
              >
                Password:
              </label>
              <p
                id="pwdnote"
                className={pwd && !validPwd ? "instructions" : "offScreen"}
              >
                Must be at least 8 characters long, must include uppercase
                letter, number and a special character
              </p>
            </div>
            <div className="register-content__form__container">
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
              />
              <label
                htmlFor="confirm_pwd"
                className={`${matchPwd ? "labelHasContent" : ""}`}
              >
                Confirm password:
              </label>
              <p
                id="confirmnote"
                className={
                  matchPwd && !validMatch ? "instructions" : "offScreen"
                }
              >
                Must match previous password input field
              </p>
            </div>
            <button
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
              Register
            </button>
          </form>
          <div className="register-content__footer">
            <h4>Already have one?</h4>
            <a href="sign_in">Sign In</a>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Register;
