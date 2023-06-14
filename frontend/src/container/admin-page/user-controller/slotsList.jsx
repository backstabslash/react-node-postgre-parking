import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { deleteBookingById, updateBookingById } from "../../../redux/booking";
import { updateSlotById } from "../../../redux/slot";

const SlotsList = ({ slots, plate }) => {
  const dispatch = new useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [currentPage, setCurrentPage] = useState(0);
  const [vehCat, setVehCat] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setVehCat(slots[currentPage]?.vehicle_category);
    setPrice(slots[currentPage]?.price);
    setStatus(slots[currentPage]?.status);
    if (
      slots[currentPage]?.status === "reserved" ||
      slots[currentPage]?.status === "occupied"
    ) {
      const fetchData = async () => {
        try {
          const resusername = await axiosPrivate.get(
            `/parking/username/id/${encodeURIComponent(
              slots[currentPage]?.slot_id
            )}`
          );
          setUsername(resusername.data.rows[0].username);
        } catch (error) {
          setUsername("");
          console.log(error);
        }
      };
      fetchData();
    } else setUsername("");
  }, [slots.length, currentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [slots[0]?.vehicle_category]);

  useEffect(() => {
    if (plate.length === 8) {
      const fetchData = async () => {
        try {
          const slotId = await axiosPrivate.get(
            `/parking/slot/plate/${encodeURIComponent(plate)}`
          );
          const index = slots.findIndex(
            (slot) => slot.slot_id === slotId.data.rows[0].slot_id
          );
          setCurrentPage(index);
        } catch (error) {
          console.log(error);
          setCurrentPage(0);
        }
      };
      fetchData();
    } else {
      setCurrentPage(0);
    }
  }, [plate]);

  const totalPages = slots.length;

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

  const handleVehCategory = (e) => {
    setVehCat(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateDetails = (e) => {
    dispatch(
      updateSlotById({
        axiosPrivate,
        slot_id: slots[currentPage].slot_id,
        price,
        vehicle_category: vehCat,
      })
    );
  };

  const handleDeleteBooking = (e) => {
    dispatch(
      updateSlotById({
        axiosPrivate,
        slot_id: slots[currentPage].slot_id,
        price,
        vehicle_category: vehCat,
      })
    );
  };

  return (
    <div>
      <div className="bookings-list-elem">
        <div className="personal-form__3col">
          <span className="bookings-list-elem-data">
            <label>Vehicle Category</label>
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
            <label>Status</label>
            <select
              value={status}
              onChange={handleStatus}
              className="veh-type-select"
            >
              <option value="" disabled={true}>
                Select booking status
              </option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="occupied">Occupied</option>
            </select>
          </span>
          <span className="bookings-list-elem-data">
            <label>Price</label>
            <input
              value={price}
              onChange={handlePrice}
              type="text"
              disabled={true}
            ></input>
          </span>
          <span className="bookings-list-elem-data">
            <label>Username</label>
            <input
              value={username === "" ? "None" : username}
              type="text"
              disabled={true}
            ></input>
          </span>
          <span className="bookings-list-elem-data">
            <label>Number</label>
            <input value={currentPage + 1} type="text" disabled={true}></input>
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
          Delete Slots
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

export default SlotsList;
