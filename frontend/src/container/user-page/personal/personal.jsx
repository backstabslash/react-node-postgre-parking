import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { useState, useEffect } from "react";
import { updateUserByUsername } from "../../../redux/user";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function UserPersonal() {
  const auth = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState(auth.username);
  const [phoneNumber, setPhoneNumber] = useState(auth.phoneNumber);
  const [fullName, setFullName] = useState(auth.fullName);
  const [currPasswd, setCurrPasswd] = useState("");
  const [newPasswd, setNewPasswd] = useState("");
  const [changingPwd, setChangingPwd] = useState(true);
  const [validCurrPwd, setValidCurrPwd] = useState(true);
  const [validNewPwd, setValidNewPwd] = useState(true);
  const [validUsername, setValidUsername] = useState(true);
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const [validFullName, setValidFullName] = useState(true);
  const [errorMsg, setErrorMsg] = useState("Fine Night");

  const USER_REGEX = /^[A-z0-9-_]{4,23}/;
  const PWD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  const PHONE_REGEX = /^(\+\d{1,2}\s)\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const FULLNAME_REGEX = /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/;

  const dispatch = new useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setValidCurrPwd(PWD_REGEX.test(currPasswd));
  }, [currPasswd]);

  useEffect(() => {
    setValidNewPwd(PWD_REGEX.test(newPasswd));
  }, [newPasswd]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPhoneNumber(PHONE_REGEX.test(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    setValidFullName(FULLNAME_REGEX.test(fullName));
  }, [fullName]);

  useEffect(() => {
    if (!validCurrPwd && currPasswd !== "") {
      setErrorMsg("Invalid (current) password format");
    } else if (!validNewPwd && newPasswd !== "") {
      setErrorMsg("Invalid (new) password format");
    } else if (!validUsername && username !== "") {
      setErrorMsg("Invalid username format");
    } else if (!validPhoneNumber && phoneNumber !== "") {
      setErrorMsg("Invalid phone number format");
    } else if (!validFullName && fullName !== "") {
      setErrorMsg("Invalid full name format");
    } else {
      setErrorMsg("Fine Night");
    }
  }, [
    currPasswd,
    newPasswd,
    username,
    phoneNumber,
    fullName,
    validCurrPwd,
    validNewPwd,
    validUsername,
    validPhoneNumber,
    validFullName,
  ]);

  const handleChangingPwd = (e) => {
    e.preventDefault();
    setChangingPwd(!changingPwd);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleCurrPasswd = (e) => {
    setCurrPasswd(e.target.value);
  };

  const handleNewPasswd = (e) => {
    setNewPasswd(e.target.value);
  };

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    if (validUsername && validPhoneNumber && validFullName && validCurrPwd) {
      dispatch(
        updateUserByUsername({
          axiosPrivate: axiosPrivate,
          username: auth.username,
          new_username: username,
          full_name: fullName,
          phone_number: phoneNumber,
          password: currPasswd,
          new_password: newPasswd,
        })
      );
    }
  };

  return (
    <>
      <section className="profile__personal-section">
        <div className="container">
          <div className="pick-container__title">
            <h3>Personal Information</h3>
            <p>
              Secure and user-friendly environment where you can effortlessly
              update, organize, and control your personal information.
            </p>
          </div>
          <form className="personal-form">
            <div className="personal-form__3col">
              <span>
                <label>Username</label>
                <input
                  value={username}
                  onChange={handleUsername}
                  type="text"
                  placeholder="Enter your username"
                  disabled={true}
                ></input>
              </span>

              <span>
                <label>Phone Number</label>
                <input
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                  type="text"
                  placeholder="Enter your phone number"
                ></input>
              </span>

              <span>
                <label>Full Name</label>
                <input
                  value={fullName}
                  onChange={handleFullName}
                  type="text"
                  placeholder="Enter your full name"
                ></input>
              </span>
              <span>
                <label>Current Password</label>
                <input
                  value={currPasswd}
                  onChange={handleCurrPasswd}
                  type="password"
                  placeholder="Enter your current password"
                ></input>
              </span>

              <span>
                <label>New Password</label>
                <input
                  value={newPasswd}
                  onChange={handleNewPasswd}
                  type="password"
                  placeholder="Enter your new password"
                  disabled={changingPwd}
                ></input>
              </span>

              <span className="personal-btns">
                <label
                  className={
                    errorMsg !== "Fine Night"
                      ? "instructions-profile"
                      : "instr-hidden"
                  }
                >
                  {errorMsg}
                </label>
                <span className="personal-upd-btns">
                  <button
                    className="profile-personal-btn personal-blue-btn"
                    onClick={handleUpdateDetails}
                  >
                    Update Details
                  </button>
                  <button
                    className="profile-personal-btn"
                    onClick={handleChangingPwd}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Change Password
                  </button>
                </span>
              </span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default UserPersonal;
