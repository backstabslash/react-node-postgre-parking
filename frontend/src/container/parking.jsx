import React, { useEffect } from "react";
import "./parking.css";
import Header from "./header/header";
import Slot from "./main/slot";
import { useSelector } from "react-redux";
import { getGuestBookings, getClientBookings } from "../redux/booking";
import { getSlots } from "../redux/slot";
import { useAppDispatch } from "../redux/hooks";
import { getVehiclesByUsername } from "../redux/vehicle";
import { getDiscountsByUsername } from "../redux/discount";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Parking = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    dispatch(getGuestBookings(axiosPrivate));
    dispatch(getSlots(axiosPrivate));
    if (auth.role !== "connect_user") {
      dispatch(getClientBookings(axiosPrivate));
      dispatch(getVehiclesByUsername(axiosPrivate));
      dispatch(getDiscountsByUsername(axiosPrivate));
    }
  }, []);

  return (
    <div className="parkingWrapper">
      <Header />
      <div className="slotsContainer">
        <Slot />
      </div>
    </div>
  );
};

export default Parking;
