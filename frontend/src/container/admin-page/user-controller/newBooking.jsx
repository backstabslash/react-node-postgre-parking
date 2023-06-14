import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import booking, { postBooking } from "../../../redux/booking";

const NewBooking = ({ user }) => {
  const vehicles = useAppSelector((state) => state.vehicle.vehicles).filter(
    (vehicle) => vehicle.user_id === user.user_id
  );
  const slots = useAppSelector((state) => state.slot.slots);
  const bookings = useAppSelector((state) => state.booking.bookings);
  const discount = useAppSelector((state) => state.discount.discounts);

  const dispatch = new useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [vehicleNo, setVehicleNo] = useState("");
  const [slotNo, setSlotNo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [amountDue, setAmountDue] = useState(0);
  const [endDate, setEndDate] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);
  const [properSlots, setProperSlots] = useState([]);
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleEndDate = (e) => {
    if (Date.parse(e.target.value) >= Date.parse(startDate) + 86400000)
      setEndDate(e.target.value);
  };

  const handleStartDate = (e) => {
    if (Date.parse(e.target.value) + 86400000 >= Date.now())
      setStartDate(e.target.value);
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

  const handleAmountDue = (e) => {
    setAmountDue(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dateSlots = await axiosPrivate.get(
          `/auth/slots/date/${encodeURIComponent(startDate)}`
        );
        const properSlots = dateSlots.data.rows.filter(
          (slot) =>
            slot.vehicle_category ===
              vehicles?.find((vehicle) => vehicle.vehicle_id === vehicleNo)
                ?.vehicle_category || ""
        );
        setProperSlots(properSlots);
      } catch (error) {
        const properSlots = slots.slots?.filter(
          (slot) =>
            slot.vehicle_category ===
              vehicles?.find((vehicle) => vehicle.vehicle_id === vehicleNo)
                ?.plate_number || ""
        );
        setProperSlots(properSlots);
      }
    };

    fetchData();
  }, [vehicleNo, startDate]);

  const handleVehicleNo = (e) => {
    setVehicleNo(e.target.value);
  };

  useEffect(() => {
    const slot = slots.filter((slot) => slot.slot_id === slotNo)[0];
    let price;
    if (slot) {
      price =
        ((Date.parse(endDate) - Date.parse(startDate)) / 86400000) * slot.price;
    }
    if (discount.length > 0) {
      const disc = discount.filter(
        (discount) =>
          discount.user_id === user.user_id &&
          Date.parse(discount.end_date) < Date.now()
      )[0];
      if (disc) {
        const discountAmount = (price * disc.percentage) / 100;
        price -= discountAmount;
      }
    }
    setAmountDue(price);
  }, [startDate, endDate, slotNo]);

  useEffect(() => {
    if (Date.parse(startDate) > Date.now() + 8640000) setStatus("upcoming");
    else setStatus("ongoing");
  }, [startDate]);

  let i = 1;

  const getVehicles = () => {
    const availableVehicles = vehicles.filter((vehicle) => {
      return !bookings.some(
        (booking) =>
          booking.vehicle_id === vehicle.vehicle_id &&
          Date.parse(booking.end_date) > Date.now() &&
          booking.status !== "canceled" &&
          booking.status !== "completed"
      );
    });

    return vehicles.map((vehicle) => {
      return (
        <option
          value={vehicle.vehicle_id}
          key={vehicle.vehicle_id}
          disabled={
            availableVehicles.some(
              (vehiclee) => vehiclee.vehicle_id === vehicle.vehicle_id
            )
              ? false
              : true
          }
        >
          {vehicle.plate_number + " " + vehicle.vehicle_category}
        </option>
      );
    });
  };

  const handleNewBooking = (e) => {
    if (
      (startDate !== "" && endDate !== "",
      vehicleNo !== "",
      slotNo !== "",
      amountDue !== "",
      amountPaid !== "")
    )
      dispatch(
        postBooking({
          axiosPrivate,
          start_date: startDate,
          end_date: endDate,
          vehicle_id: vehicleNo,
          slot_id: slotNo,
          amount_due: amountDue,
          amount_paid: amountPaid,
          remarks: remarks,
        })
      );
  };

  return (
    <div className="container">
      <div className="pick-container__title">
        <h3>{user?.username} New Booking</h3>
        <p>Add bookings with ease.</p>
      </div>
      <div className="bookings-list-elem">
        <div className="bookings-list-4col">
          <span className="bookings-list-elem-data">
            <label>Vehicle Number</label>
            <select
              value={vehicleNo}
              onChange={handleVehicleNo}
              className="veh-type-select"
            >
              <option value="">Select vehicle</option>
              {getVehicles()}
            </select>
          </span>
          <span className="bookings-list-elem-data">
            <label>Slot Nubmer</label>
            <select
              value={slotNo}
              onChange={handleSlotNo}
              className="veh-type-select"
            >
              <option value="" disabled={true}>
                Select parking slot
              </option>
              {properSlots?.length > 0 &&
                properSlots.map((slot) => {
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
                        " ₴ " +
                        slot.status}
                    </option>
                  );
                })}
            </select>
          </span>
          <span className="bookings-list-elem-data">
            <label>Start Date</label>
            <input
              value={startDate}
              onChange={handleStartDate}
              type="date"
            ></input>
          </span>
          <span className="bookings-list-elem-data">
            <label>End Date</label>
            <input value={endDate} type="date" onChange={handleEndDate}></input>
          </span>
          <span className="bookings-list-elem-data">
            <label>Amount Due</label>
            <input
              value={amountDue}
              type="text"
              onChange={handleAmountDue}
              disabled={true}
            ></input>
          </span>
          <span className="bookings-list-elem-data">
            <label>Amount Paid</label>
            <input
              value={amountPaid}
              type="text"
              onChange={handleAmountPaid}
            ></input>
          </span>

          <span className="bookings-list-elem-data">
            <label>Status</label>
            <select value={status} className="veh-type-select" disabled={true}>
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
              <option value="canceled" disabled={true}>
                Canceled
              </option>
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
          className="booking-btns-btn booking-blue-btn"
          onClick={handleNewBooking}
        >
          New Booking
        </button>
      </div>
    </div>
  );
};

export default NewBooking;
