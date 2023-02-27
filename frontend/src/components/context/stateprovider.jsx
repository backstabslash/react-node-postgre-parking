import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

const StateContext = createContext({
  slots: {},
  setSlots: () => {},
  vehicles: {},
  setVehicles: () => {},
  bookings: {},
  setBookings: () => {},
  discounts: {},
  setDiscounts: () => {},
});

export const StateProvider = () => {
  const [slots, setSlots] = useState({});
  const [vehicles, setVehicles] = useState({});
  const [bookings, setBookings] = useState({});
  const [discounts, setDiscounts] = useState({});

  return (
    <StateContext.Provider
      value={{
        slots,
        setSlots,
        vehicles,
        setVehicles,
        bookings,
        setBookings,
        discounts,
        setDiscounts,
      }}
    >
      <Outlet />
    </StateContext.Provider>
  );
};

export default StateContext;
