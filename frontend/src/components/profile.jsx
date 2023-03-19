import React, { useState } from "react";
import "./profile.css";
import { useAppSelector } from "../redux/hooks";

function Slot() {
  const auth = useAppSelector((state) => state.auth);
  const bookings = useAppSelector((state) => state.booking.bookings);
  const vehicles = useAppSelector((state) => state.vehicle.vehicles);
  const discounts = useAppSelector((state) => state.discount.discounts);

  return <></>;
}

export default Slot;
