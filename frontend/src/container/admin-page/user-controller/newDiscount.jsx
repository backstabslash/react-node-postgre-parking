import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { postDiscount } from "../../../redux/discount";

const NewDiscount = ({ user }) => {
  const dispatch = new useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [percentage, setPercentage] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const handlePercentage = (e) => {
    setPercentage(e.target.value);
  };

  const addDiscount = (e) => {
    dispatch(
      postDiscount({
        axiosPrivate,
        start_date: startDate,
        end_date: endDate,
        percentage,
        user_id: user.user_id,
      })
    );
  };

  return (
    <div className="container">
      <div className="pick-container__title">
        <h3>{user?.username} New Discount</h3>
        <p>Manage, modify, and measure discounts with ease.</p>
      </div>
      <div className="bookings-list-4col">
        <span className="bookings-list-elem-data">
          <label>Start Date</label>
          <input
            value={startDate}
            onChange={handleStartDate}
            type="date"
            className="user-search-input"
          ></input>
        </span>
        <span className="bookings-list-elem-data">
          <label>End Date</label>
          <input
            value={endDate}
            type="date"
            onChange={handleEndDate}
            className="user-search-input"
          ></input>
        </span>
        <span className="bookings-list-elem-data">
          <label>Percentage</label>
          <input
            value={percentage}
            type="text"
            onChange={handlePercentage}
            className="user-search-input"
          ></input>
        </span>
        <span className="bookings-list-elem-data">
          <label style={{ visibility: "hidden" }}>New Discount</label>
          <button
            className="booking-btns-btn booking-blue-btn"
            onClick={addDiscount}
          >
            Add Discount
          </button>
        </span>
      </div>
    </div>
  );
};

export default NewDiscount;
