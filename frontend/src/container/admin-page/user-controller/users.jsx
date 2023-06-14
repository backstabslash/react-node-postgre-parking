import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { deleteUserById, postUser, updateUserById } from "../../../redux/user";
import UsersVehicles from "./vehicles";
import UsersBookings from "./bookings";
import NewBooking from "./newBooking";
import UsersDiscount from "./discount";
import NewDiscount from "./newDiscount";
import { useNavigate } from "react-router-dom";
import AdminSlots from "./slots";
import { getSlots } from "../../../redux/slot";
import NewSlot from "./newSlot";
import AdminStats from "./stats";

const UsersAdmin = () => {
  const users = useAppSelector((state) => state.user.users);
  const vehicles = useAppSelector((state) => state.vehicle.vehicles);
  const dispatch = new useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [currentPage, setCurrentPage] = useState(0);

  const [username, setUsername] = useState(users[currentPage]?.username);
  const [phoneNumber, setPhoneNumber] = useState(
    users[currentPage]?.phone_number
  );
  const [fullName, setFullName] = useState(users[currentPage]?.full_name);
  const [category, setCategory] = useState(users[currentPage]?.category);
  const [newPasswd, setNewPasswd] = useState("");
  const [validNewPwd, setValidNewPwd] = useState(true);
  const [validUsername, setValidUsername] = useState(true);
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const [validFullName, setValidFullName] = useState(true);
  const [usernameSearch, setUsernameSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("Fine Night");
  const [filter, setFilter] = useState(0); // 0 vehicles 1 bookings 2 discounts 3 slots 4 stats

  const USER_REGEX = /^[A-z0-9-_]{4,23}/;
  const PWD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  const PHONE_REGEX = /^(\+\d{1,2}\s)\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const FULLNAME_REGEX = /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/;

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
    if (!validNewPwd && newPasswd !== "") {
      setErrorMsg("Invalid (new) password format");
    } else if (!validPhoneNumber && phoneNumber !== "") {
      setErrorMsg("Invalid phone number format");
    } else if (!validFullName && fullName !== "") {
      setErrorMsg("Invalid full name format");
    } else {
      setErrorMsg("Fine Night");
    }
  }, [
    newPasswd,
    username,
    phoneNumber,
    fullName,
    validNewPwd,
    validUsername,
    validPhoneNumber,
    validFullName,
  ]);

  const handleSearch = (e) => {
    setUsernameSearch(e.target.value);
    const userIndex = users.findIndex(
      (user) => user.username === e.target.value
    );
    if (userIndex !== -1) setCurrentPage(userIndex);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleNewPasswd = (e) => {
    setNewPasswd(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleCategory = (e) => {
    if (e.target.value !== "") setCategory(e.target.value);
  };

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    if (validPhoneNumber && validFullName) {
      dispatch(
        updateUserById({
          axiosPrivate: axiosPrivate,
          phone_number: phoneNumber,
          full_name: fullName,
          category: category,
          new_password: newPasswd,
          user_id: users[currentPage].user_id,
        })
      );
    }
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    dispatch(
      deleteUserById({
        axiosPrivate: axiosPrivate,
        user_id: users[currentPage].user_id,
      })
    );
    setCurrentPage(0);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (validFullName && validNewPwd && validPhoneNumber && validUsername) {
      dispatch(
        postUser({
          axiosPrivate,
          username: username,
          password: newPasswd,
          full_name: fullName,
          phone_number: phoneNumber,
        })
      );
    }
    setCurrentPage(0);
  };

  useEffect(() => {
    if (users.length > 0) {
      setUsername(users[currentPage].username || "");
      setPhoneNumber(users[currentPage].phone_number ?? "");
      setFullName(users[currentPage].full_name || "");
      setCategory(users[currentPage].category || "");
      setNewPasswd("");
    }
  }, [users.length, currentPage]);

  const goToNextPage = () => {
    if (currentPage < users.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (filterN, route) => {
    if (filterN === 3) dispatch(getSlots(axiosPrivate));
    setFilter(filterN);
    navigate("/profile/" + route);
  };

  return (
    <>
      {users.length > 0 && (
        <section className="profile__personal-section">
          <div className="container">
            <div className="pick-container__title">
              <h3>User Information</h3>
              <p>
                Secure and user-friendly environment where you can effortlessly
                update, organize, and control other users personal information.
              </p>
            </div>
            <form className="personal-form">
              <div className="personal-form__3col">
                <span>
                  <label>Username</label>
                  <input
                    value={username}
                    onChange={handleUsername}
                    disabled={true}
                    type="text"
                    placeholder="Enter your username"
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
                  <label>Category</label>
                  <select
                    value={category}
                    onChange={handleCategory}
                    className="veh-type-select"
                    disabled={category === "administrator"}
                  >
                    <option value="" disabled={true}>
                      Select user category
                    </option>
                    <option value="client">Client</option>
                    <option value="administrator">Administrator</option>
                  </select>
                </span>

                <span>
                  <label>New Password</label>
                  <input
                    value={newPasswd}
                    onChange={handleNewPasswd}
                    type="password"
                    placeholder="Enter your new password"
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
                  <span className="users-admin-btns">
                    <button
                      className="profile-users-btn edit-btn"
                      onClick={handleUpdateDetails}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      className="profile-users-btn del-btn"
                      onClick={handleDeleteUser}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      className="profile-users-btn save-btn"
                      onClick={handleAddUser}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                </span>
              </div>
            </form>
            <div className="booking-btns">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                className="booking-btns-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Previous
              </button>
              <input
                className="user-search-input"
                value={usernameSearch}
                onChange={handleSearch}
                type="text"
                placeholder="Search by username"
              ></input>
              <button
                onClick={goToNextPage}
                disabled={currentPage === users.length - 1}
                className="booking-btns-btn"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="container">
            <div className="personal-form__3col" style={{ gap: "0" }}>
              <span className="bookings-list-elem-data">
                <label style={{ display: "none" }}>Vehicles</label>
                <button
                  className={`booking-btns-btn ${
                    filter === 0 && "booking-blue-btn"
                  } date-width`}
                  onClick={() => handleFilterChange(0, "vehicle")}
                >
                  Vehicles
                </button>
              </span>
              <span className="bookings-list-elem-data">
                <label style={{ display: "none" }}>Bookings</label>
                <button
                  className={`booking-btns-btn ${
                    filter === 1 && "booking-blue-btn"
                  } date-width`}
                  onClick={() => handleFilterChange(1, "booking")}
                >
                  Bookings
                </button>
              </span>
              <span className="bookings-list-elem-data">
                <label style={{ display: "none" }}>Discounts</label>
                <button
                  className={`booking-btns-btn ${
                    filter === 2 && "booking-blue-btn"
                  } date-width`}
                  onClick={() => handleFilterChange(2, "discount")}
                >
                  Discount
                </button>
              </span>
              <span className="bookings-list-elem-data">
                <label style={{ display: "none" }}>Slots</label>
                <button
                  className={`booking-btns-btn ${
                    filter === 3 && "booking-blue-btn"
                  } date-width`}
                  onClick={() => handleFilterChange(3, "slot")}
                >
                  Slots
                </button>
              </span>
              <span className="bookings-list-elem-data">
                <label style={{ display: "none" }}>Slots</label>
                <button
                  className={`booking-btns-btn ${
                    filter === 4 && "booking-blue-btn"
                  } date-width`}
                  onClick={() => handleFilterChange(4, "stats")}
                >
                  Statistics
                </button>
              </span>
            </div>
          </div>
          {filter === 0 && <UsersVehicles user={users[currentPage]} />}
          {filter === 1 && (
            <>
              <UsersBookings
                vehicles={vehicles.filter(
                  (vehicle) => vehicle.user_id === users[currentPage].user_id
                )}
                user={users[currentPage]}
              />
              <NewBooking user={users[currentPage]} />
            </>
          )}
          {filter === 2 && (
            <>
              <UsersDiscount user={users[currentPage]} />
              <NewDiscount user={users[currentPage]} />
            </>
          )}
          {filter === 3 && (
            <>
              <AdminSlots />
              <NewSlot />
            </>
          )}
          {filter === 4 && <AdminStats />}
        </section>
      )}
    </>
  );
};

export default UsersAdmin;
