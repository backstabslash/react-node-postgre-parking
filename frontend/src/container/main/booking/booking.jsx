import React, { useState, useContext, useEffect } from "react";
import StateContext from "../../../components/context/stateprovider";
import "./booking.css";
import Select from "react-select";

const Booking = ({ slot, setRenderBookingSection }) => {
  const { vehicles } = useContext(StateContext);
  const [properVehicles, setProperVehicles] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    let arr = [...vehicles];
    for (let vehicle of vehicles) {
      if (vehicle.vehicle_category !== slot.vehicle_category)
        vehicle.isDisabled = true;
      else vehicle.isDisabled = false;
      vehicle.label =
        vehicle.value = `${vehicle.brand.toLowerCase()} ${vehicle.plate_number.toLowerCase()}`;
    }
    setProperVehicles(arr);
    setSelectedOption(null);
    if (slot.status === "Busy") setIsDisabled(true);
    else setIsDisabled(false);
  }, [slot]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const blue = "rgba(3, 129, 254, 0.8)",
    red = "rgba(247, 111, 104, 0.8)",
    black = "rgba(22, 22, 23, 1)",
    white = "rgba(229, 229, 229, 1)",
    green = "rgba(44, 187, 93, 0.8)";
  const selectStyles = {
    control: (styles, state) => ({
      ...styles,
      marginBottom: "6px",
      marginTop: "4px",
      borderColor: state.isDisabled ? red : blue,
      boxShadow: "none",
      cursor: "pointer",
      userSelect: "none",
      backgroundColor: black,
      "&:hover": {
        borderColor: blue,
      },
    }),
    option: (base, state) => ({
      ...base,
      color: state.isDisabled ? red : state.isSelected ? green : blue,
      backgroundColor: black,
      cursor: state.isDisabled
        ? "not-allowed"
        : state.isSelected
        ? "default"
        : "pointer",
      "&:hover": {
        backgroundColor: white,
      },
    }),
    menu: (base, state) => ({
      ...base,
      backgroundColor: black,
    }),
    placeholder: (base, state) => ({
      ...base,
      color: state.isDisabled ? red : blue,
    }),
    singleValue: (base, state) => ({
      ...base,
      color: blue,
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isDisabled ? red : blue,
      "&:hover": {
        color: state.isDisabled ? red : blue,
      },
      ":active": {
        ...base[":active"],
        color: state.isDisabled ? red : blue,
      },
    }),
    indicatorSeparator: (base, state) => ({
      ...base,
      backgroundColor: state.isDisabled ? red : blue,
    }),
  };

  return (
    <div className={`bookingWrapper`}>
      <div className="stats">
        <div className="statContainer">
          <div
            className={`statProp ${slot.status === "Busy" ? "busySlot" : ""}`}
          >
            {slot.slot_id}
          </div>
          <div
            className={`statLabel ${slot.status === "Busy" ? "busySlot" : ""}`}
          >
            ID
          </div>
        </div>
        <div className="statContainer">
          <div className="statProp">{slot.vehicle_category.toLowerCase()}</div>
          <div className="statLabel">category</div>
        </div>
        <div className="statContainer">
          <div
            className={`statProp ${slot.status === "Busy" ? "busySlot" : ""}`}
          >
            {slot.status.toLowerCase()}
          </div>
          <div
            className={`statLabel ${slot.status === "Busy" ? "busySlot" : ""}`}
          >
            status
          </div>
        </div>
        <div className="statContainer">
          <div className="statProp">{slot.price}₴</div>
          <div className="statLabel">price</div>
        </div>
      </div>
      <div className="userInfo">
        <div
          className={`userLabel ${slot.status === "Busy" ? "busySlot" : ""}`}
        >
          vehicle
        </div>
        <Select
          onChange={handleSelectChange}
          isDisabled={isDisabled}
          isFocused={isFocused}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isSearchable={false}
          options={properVehicles}
          placeholder="select"
          styles={selectStyles}
          value={selectedOption}
        />
      </div>
      <div className="buttonsContainer">
        <button
          className="closeBookingBtn"
          onClick={() => setRenderBookingSection(false)}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default Booking;
