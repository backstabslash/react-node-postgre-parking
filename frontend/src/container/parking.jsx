import React, { useEffect, useContext } from "react";
import "./parking.css";
import Header from "./header/header";
import Slot from "./main/slot";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import StateContext from "../components/context/stateprovider";
import { useSelector } from "react-redux";
import { getBookings } from "../redux/booking";
import { getSlots } from "../redux/slot";
import { useAppDispatch } from "../redux/hooks";

const Parking = () => {
  const axiosPrivate = useAxiosPrivate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { setVehicles, setDiscounts } = useContext(StateContext);

  useEffect(() => {
    let isMounted = true;
    dispatch(getBookings());
    dispatch(getSlots());
    if (auth.role) {
      const getVehicles = async () => {
        try {
          const response = await axiosPrivate.get(
            `/vehicle/username/${encodeURIComponent(auth.username)}`,
            {}
          );
          isMounted && setVehicles(response.data.rows);
        } catch (err) {
          console.error(err);
          // navigate("/sign_in", { replace: true });
        }
      };
      const getDiscounts = async () => {
        try {
          const response = await axiosPrivate.get(
            `/discount/username/${encodeURIComponent(auth.username)}`,
            {}
          );
          isMounted && setDiscounts(response.data.rows);
        } catch (err) {
          console.error(err);
          // navigate("/sign_in", { replace: true });
        }
      };
      getVehicles();
      getDiscounts();
    }

    return () => {
      isMounted = false;
    };
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
