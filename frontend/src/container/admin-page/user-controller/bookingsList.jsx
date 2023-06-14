import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { deleteBookingById, updateBookingById } from "../../../redux/booking";

const BookingsList = ({ bookings }) => {
  const vehicles = useAppSelector((state) => state.vehicle);
  const slots = useAppSelector((state) => state.slot);
  const dispatch = new useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = bookings.length;

  const [vehicleNo, setVehicleNo] = useState("");
  const [slotNo, setSlotNo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [amountDue, setAmountDue] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [properSlots, setProperSlots] = useState([]);

  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (bookings.length > 0) {
      if (vehicles.vehicles.length > 0)
        setVehicleNo(
          vehicles.vehicles?.find(
            (vehicle) =>
              vehicle.vehicle_id === bookings[currentPage]?.vehicle_id
          )?.plate_number || ""
        );
      if (slots.slots.length > 0) {
        setSlotNo(
          slots.slots?.find(
            (slot) => slot.slot_id === bookings[currentPage]?.slot_id
          )?.slot_id ?? ""
        );
      }
      const fetchData = async () => {
        try {
          const dateSlots = await axiosPrivate.get(
            `/auth/slots/date/${encodeURIComponent(startDate)}`
          );
          const properSlots = dateSlots.data.rows.filter(
            (slot) =>
              slot.vehicle_category ===
                vehicles.vehicles?.find(
                  (vehicle) =>
                    vehicle.vehicle_id === bookings[currentPage]?.vehicle_id
                )?.vehicle_category || ""
          );
          setProperSlots(properSlots);
        } catch (error) {
          const properSlots = slots.slots.filter(
            (slot) =>
              slot.vehicle_category ===
                vehicles.vehicles?.find(
                  (vehicle) =>
                    vehicle.vehicle_id === bookings[currentPage]?.vehicle_id
                )?.plate_number || ""
          );
          setProperSlots(properSlots);
        }
      };
      fetchData();
      setAmountDue(bookings[currentPage].amount_due || "");
      setAmountPaid(bookings[currentPage].amount_paid ?? "");
      setStartDate(bookings[currentPage].start_date || "");
      setEndDate(bookings[currentPage].end_date || "");
      setStatus(bookings[currentPage].status || "");
      setRemarks(bookings[currentPage].remarks || "");
    }
  }, [
    bookings.length,
    currentPage,
    vehicles.vehicles.length,
    slots.slots.length,
  ]);

  useEffect(() => {
    if (bookings.length > 0) setAmountDue(bookings[currentPage].amount_due);
  }, [bookings[currentPage]?.amount_due]);

  const handleUpdateDetails = () => {
    dispatch(
      updateBookingById({
        axiosPrivate,
        start_date: startDate,
        end_date: endDate,
        status,
        amount_due: amountDue,
        amount_paid: amountPaid,
        slot_id: slotNo,
        remarks,
        booking_id: bookings[currentPage].booking_id,
      })
    );
  };

  const handleDeleteBooking = () => {
    dispatch(
      deleteBookingById({
        axiosPrivate,
        booking_id: bookings[currentPage].booking_id,
      })
    );
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

  const handleStatus = (e) => {
    if (e.target.value !== "") setStatus(e.target.value);
  };

  const handleEndDate = (e) => {
    if (Date.parse(e.target.value) >= Date.parse(endDate) + 86400000)
      setEndDate(e.target.value);
  };

  const handleSlotNo = (e) => {
    setSlotNo(e.target.value);
  };

  const handleRemarks = (e) => {
    setRemarks(e.target.value);
  };

  const handleAmountPaid = (e) => {
    setAmountPaid(e.target.value);
  };

  const getSlots = () => {
    let i = 1;
    return properSlots.map((slot) => {
      return (
        <option
          value={slot.slot_id}
          key={slot.slot_id}
          disabled={slot.status === "available" ? false : true}
        >
          {"Position: " +
            i++ +
            " Price: " +
            slot.price +
            " ₴" +
            " Status: " +
            slot.status}
        </option>
      );
    });
  };

  return (
    <div>
      <div className="bookings-list-elem">
        <div className="bookings-list-4col">
          <span className="bookings-list-elem-data">
            <label>Vehicle Number</label>
            <input value={vehicleNo} type="text" disabled={true}></input>
          </span>
          <span className="bookings-list-elem-data">
            <label>Slot Nubmer</label>
            <select
              value={slotNo}
              onChange={handleSlotNo}
              disabled={
                status === "completed" || status === "canceled" ? true : false
              }
              className="veh-type-select"
            >
              <option value="" disabled={true}>
                Select parking slot
              </option>
              {getSlots()}
            </select>
          </span>
          <span className="bookings-list-elem-data">
            <label>Start Date</label>
            <input value={startDate} type="date" disabled={true}></input>
          </span>
          <span className="bookings-list-elem-data">
            <label>End Date</label>
            <input
              value={endDate}
              type="date"
              onChange={handleEndDate}
              disabled={
                status === "completed" || status === "canceled" ? true : false
              }
            ></input>
          </span>
          <span className="bookings-list-elem-data">
            <label>Amount Due</label>
            <input value={amountDue} type="text" disabled={true}></input>
          </span>
          <span className="bookings-list-elem-data">
            <label>Amount Paid</label>
            <input
              value={amountPaid}
              type="text"
              onChange={handleAmountPaid}
              disabled={
                status === "completed" || status === "canceled" ? true : false
              }
            ></input>
          </span>
          <span className="bookings-list-elem-data">
            <label>Status</label>
            <select
              value={status}
              onChange={handleStatus}
              className="veh-type-select"
              disabled={
                status === "completed" || status === "canceled" ? true : false
              }
            >
              <option value="" disabled={true}>
                Select booking status
              </option>
              <option value="completed" disabled={true}>
                Completed
              </option>
              <option value="upcoming" disabled={true}>
                Upcoming
              </option>
              <option value="ongoing" disabled={true}>
                Ongoing
              </option>
              <option value="canceled">Canceled</option>
            </select>
          </span>
          <span className="bookings-list-elem-data">
            <label>Remarks</label>
            <input
              value={remarks}
              onChange={handleRemarks}
              type="text"
              placeholder="Enter your rematks"
            ></input>
          </span>
        </div>
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
          className="booking-btns-btn booking-blue-btn"
          onClick={handleUpdateDetails}
        >
          Update Details
        </button>
        <button
          className="booking-btns-btn booking-blue-btn"
          onClick={handleDeleteBooking}
        >
          Delete Booking
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
    </div>
  );
};

export default BookingsList;
