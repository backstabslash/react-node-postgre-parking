import React, { useState, useContext, useEffect } from "react";
import StateContext from "../../../components/context/stateprovider";
import "./booking.css";
import { selectStyles } from "./selectProps";
import Select from "react-select";
import { useAppSelector } from "../../../redux/hooks";

const Booking = ({ slot, setRenderBookingSection }) => {
  const { vehicles } = useContext(StateContext);
  const auth = useAppSelector((state) => state.auth);
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
    if (slot.status === "occupied" || slot.status === "reserved")
      setIsDisabled(true);
    else setIsDisabled(false);
  }, [slot]);

  useEffect(() => {
    if (auth.role === "connect_user" || null) setRenderBookingSection(false);
  }, [auth]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`bookingWrapper`}>
      <div className="stats">
        <div className="statContainer">
          <div
            className={`statProp ${
              slot.status === "occupied" || slot.status === "reserved"
                ? "busySlot"
                : ""
            }`}
          >
            {slot.slot_id}
          </div>
          <div
            className={`statLabel ${
              slot.status === "occupied" || slot.status === "reserved"
                ? "busySlot"
                : ""
            }`}
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
            className={`statProp ${
              slot.status === "occupied" || slot.status === "reserved"
                ? "busySlot"
                : ""
            }`}
          >
            {slot.status.toLowerCase()}
          </div>
          <div
            className={`statLabel ${
              slot.status === "occupied" || slot.status === "reserved"
                ? "busySlot"
                : ""
            }`}
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
          className={`userLabel ${
            slot.status === "occupied" || slot.status === "reserved"
              ? "busySlot"
              : ""
          }`}
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
