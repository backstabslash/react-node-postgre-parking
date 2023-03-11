import React, { useState, useEffect } from "react";
import "./booking.css";
import { selectStyles } from "./selectProps";
import Select from "react-select";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { updateVehiclesForBooking } from "../../../redux/vehicle";

const Booking = ({ slot, setRenderBookingSection }) => {
  const vehicles = useAppSelector((state) => state.vehicle);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [properVehicles, setProperVehicles] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const updatedVehicles = vehicles.vehicles.map((vehicle) => {
      const isDisabled = vehicle.vehicle_category !== slot.vehicle_category,
        label = `${vehicle.brand.toLowerCase()} ${vehicle.plate_number.toLowerCase()}`,
        value = `${vehicle.brand.toLowerCase()} ${vehicle.plate_number.toLowerCase()}`;
      return { ...vehicle, isDisabled, label, value };
    });
    dispatch(updateVehiclesForBooking(updatedVehicles));
    setProperVehicles(updatedVehicles);
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
