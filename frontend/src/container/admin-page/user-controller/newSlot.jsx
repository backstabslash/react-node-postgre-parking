import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { postDiscount } from "../../../redux/discount";
import { postSlot } from "../../../redux/slot";

const NewSlot = () => {
  const dispatch = new useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [price, setPrice] = useState(0);
  const [vehCat, setVehCat] = useState("");

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleVehCategory = (e) => {
    setVehCat(e.target.value);
  };

  const addDiscount = (e) => {
    dispatch(
      postSlot({
        axiosPrivate,
        vehicle_category: vehCat,
        price,
      })
    );
  };

  return (
    <div className="container">
      <div className="pick-container__title">
        <h3>New Slots</h3>
        <p>Manage, modify, and measure discounts with ease.</p>
      </div>
      <div className="stats-form__3col">
        <span className="bookings-list-elem-data">
          <label>Status</label>
          <select
            className="veh-type-select"
            value={vehCat}
            onChange={handleVehCategory}
          >
            <option value="" disabled={true}>
              Select vehicle category
            </option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Truck">Truck</option>
            <option value="Car">Car</option>
            <option value="Bus">Bus</option>
          </select>
        </span>
        <span className="bookings-list-elem-data">
          <label>Price</label>
          <input
            value={price}
            type="text"
            onChange={handlePrice}
            className="user-search-input"
          ></input>
        </span>
        <span className="bookings-list-elem-data">
          <label style={{ visibility: "hidden" }}>New Discount</label>
          <button
            className="booking-btns-btn booking-blue-btn"
            onClick={addDiscount}
          >
            Add Slot
          </button>
        </span>
      </div>
    </div>
  );
};

export default NewSlot;
