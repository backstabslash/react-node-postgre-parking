import React, { useEffect, useContext } from "react";
import "./parking.css";
import Header from "./header/header";
import Slot from "./main/slot";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import StateContext from "../components/context/stateprovider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../axios";

const Parking = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const { setSlots, setVehicles, setBookings, setDiscounts } =
    useContext(StateContext);
  useEffect(() => {
    let isMounted = true;
    axios
      .get("/user/slots", {})
      .then(
        (res) =>
          isMounted &&
          setSlots(res.data.rows.sort((a, b) => a.slot_id - b.slot_id))
      )
      .catch((err) => console.log(err));
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
          navigate("/sign_in", { replace: true });
        }
      };
      const getBookings = async () => {
        try {
          const response = await axiosPrivate.get(
            `/booking/username/${encodeURIComponent(auth.username)}`,
            {}
          );
          isMounted && setBookings(response.data.rows);
        } catch (err) {
          console.error(err);
          navigate("/sign_in", { replace: true });
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
          navigate("/sign_in", { replace: true });
        }
      };
      getVehicles();
      getBookings();
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
