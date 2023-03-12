import React, { useState, useEffect } from "react";
import "./booking.css";
import { selectStyles } from "./selectProps";
import Select from "react-select";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { updateVehiclesForBooking } from "../../../redux/vehicle";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { postBooking } from "../../../redux/booking";

const Booking = ({ slot, setRenderBookingSection }) => {
  const vehicles = useAppSelector((state) => state.vehicle);
  const auth = useAppSelector((state) => state.auth);
  const bookings = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [properVehicles, setProperVehicles] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

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
    setStartDate("");
    setEndDate("");
    setTotalPrice("0");
    if (slot.status === "occupied" || slot.status === "reserved")
      setIsDisabled(true);
    else setIsDisabled(false);
  }, [slot]);

  useEffect(() => {
    if (auth.role === "connect_user" || null) setRenderBookingSection(false);
  }, [auth]);

  useEffect(() => {
    if (startDate.length === 10 && endDate.length === 10) {
      const total =
        ((Date.parse(endDate) - Date.parse(startDate)) / 86400000) * slot.price;
      if (total > 0) setTotalPrice(total);
      else setTotalPrice(0);
    }
  }, [startDate, endDate]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const onChangeStartDate = (e) => {
    const re = /^[0-9-]+$/;
    if (e.target.value >= "" || re.test(startDate + e.target.value))
      setStartDate(e.target.value);
  };

  const onChangeEndDate = (e) => {
    const re = /^[0-9-]+$/;
    if (e.target.value === "" || re.test(startDate + e.target.value))
      setEndDate(e.target.value);
  };

  const handleNewBooking = (e) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (
      selectedOption !== null &&
      regex.test(startDate) &&
      regex.test(endDate) &&
      Date.parse(endDate) > Date.parse(startDate) &&
      Date.parse(startDate) > Date.now()
    ) {
      const vehicle_id = selectedOption.vehicle_id,
        slot_id = slot.slot_id;
      dispatch(
        postBooking({
          axiosPrivate,
          start_date: startDate,
          end_date: endDate,
          vehicle_id,
          slot_id,
          amount_due: totalPrice,
        })
      )
        .unwrap()
        .then((e) => console.log(e));
    }
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
        <div className="columnInfo">
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
        <div className="columnInfo">
          <div
            className={`userLabel ${
              slot.status === "occupied" || slot.status === "reserved"
                ? "busySlot"
                : ""
            }`}
          >
            start date
          </div>
          <div
            className={`bookingInputContainer ${
              slot.status === "occupied" || slot.status === "reserved"
                ? "bookingInputContainerBusy"
                : ""
            }`}
          >
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={startDate}
              placeholder="yyyy-mm-dd"
              onChange={onChangeStartDate}
              disabled={
                slot.status === "occupied" || slot.status === "reserved"
              }
              required
            />
          </div>
        </div>
        <div className="columnInfo">
          <div
            className={`userLabel ${
              slot.status === "occupied" || slot.status === "reserved"
                ? "busySlot"
                : ""
            }`}
          >
            end date
          </div>
          <div
            className={`bookingInputContainer ${
              slot.status === "occupied" || slot.status === "reserved"
                ? "bookingInputContainerBusy"
                : ""
            }`}
          >
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={endDate}
              placeholder="yyyy-mm-dd"
              onChange={onChangeEndDate}
              disabled={
                slot.status === "occupied" || slot.status === "reserved"
              }
              required
            />
          </div>
        </div>
        {slot.status === "available" ? (
          <div className="columnInfo">
            <div className={`userLabel `}>total price</div>
            <div className={`bookingPriceConatainer`}>
              {isNaN(totalPrice) ? 0 : totalPrice}₴
            </div>
          </div>
        ) : (
          <></>
        )}
        {slot.status === "occupied" || slot.status === "reserved" ? (
          <div className="columnInfo">
            <div
              className={`userLabel ${
                slot.status === "occupied" || slot.status === "reserved"
                  ? "busySlot"
                  : ""
              }`}
            >
              occupied until
            </div>
            <div
              className={`bookingPriceConatainer ${
                slot.status === "occupied" || slot.status === "reserved"
                  ? "busyPriceContainer"
                  : ""
              }`}
            >
              {bookings.guestBookings.length > 0
                ? bookings.guestBookings.map((booking) => {
                    if (
                      booking.slot_id === slot.slot_id &&
                      Date.parse(booking.end_date) > Date.now() // >= ?
                    )
                      return booking.end_date.substring(0, 10);
                    return null;
                  })
                : null}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="buttonsContainer">
        <button
          className="closeBookingBtn"
          onClick={() => setRenderBookingSection(false)}
        >
          close
        </button>
        <button className="closeBookingBtn" onClick={handleNewBooking}>
          book
        </button>
      </div>
    </div>
  );
};

export default Booking;
