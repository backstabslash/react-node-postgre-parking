import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
  deleteDiscountById,
  postDiscount,
  putDiscountById,
} from "../../../redux/discount";
import NewDiscount from "./newDiscount";

const UsersDiscount = ({ user }) => {
  const discount = useAppSelector((state) => state.discount.discounts).filter(
    (discount) => discount.user_id === user.user_id
  );
  const dispatch = new useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = discount.length;

  const [percentage, setPercentage] = useState(
    discount[currentPage]?.percentage
  );
  const [startDate, setStartDate] = useState(discount[currentPage]?.start_date);
  const [endDate, setEndDate] = useState(discount[currentPage]?.end_date);

  useEffect(() => {
    setPercentage(discount[currentPage]?.percentage);
    setStartDate(discount[currentPage]?.start_date.substring(0, 10));
    setEndDate(discount[currentPage]?.end_date.substring(0, 10));
  }, [currentPage, discount.length]);

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const handlePercentage = (e) => {
    setPercentage(e.target.value);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const updateDiscount = () => {
    dispatch(
      putDiscountById({
        axiosPrivate,
        end_date: endDate,
        percentage,
        discount_id: discount[currentPage].discount_id,
      })
    );
  };

  const deleteDiscount = () => {
    dispatch(
      deleteDiscountById({
        axiosPrivate,
        discount_id: discount[currentPage].discount_id,
      })
    );
  };

  return (
    <section className="profile_bookings-section">
      <div className="container">
        <div className="pick-container__title">
          <h3>{user?.username} Discount</h3>
          <p>Manage, modify, and measure discounts with ease.</p>
        </div>
        {discount.length > 0 ? (
          <>
            <div className="stats-form__3col">
              <span className="bookings-list-elem-data">
                <label>Start Date</label>
                <input
                  value={startDate}
                  type="date"
                  disabled={true}
                  className="date-width"
                ></input>
              </span>
              <span className="bookings-list-elem-data">
                <label>End Date</label>
                <input
                  value={endDate}
                  type="date"
                  onChange={handleEndDate}
                  className="date-width"
                ></input>
              </span>
              <span className="bookings-list-elem-data">
                <label>Percentage</label>
                <input
                  value={percentage}
                  onChange={handlePercentage}
                  type="text"
                  placeholder="Enter percentage"
                  className="date-width"
                ></input>
              </span>
            </div>
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
              <button
                onClick={updateDiscount}
                className="booking-btns-btn booking-blue-btn"
              >
                Update
              </button>
              <button
                onClick={deleteDiscount}
                className="booking-btns-btn booking-blue-btn"
              >
                Delete
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
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
          </>
        ) : (
          <div className="pick-container__title">
            <h3>This user has no discounts.</h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default UsersDiscount;
