import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getGuestBookings, getClientBookings } from "../redux/booking";
import { getSlots } from "../redux/slot";
import { useAppDispatch } from "../redux/hooks";
import { getVehiclesByUsername } from "../redux/vehicle";
import { getDiscountsByUsername } from "../redux/discount";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Intro from "./main/intro/intro";
import Book from "./main/book/book";
import Plan from "./main/plan/plan";
import Banner from "./main/banner/banner";
import Reviews from "./main/reviews/reviews";
import Faq from "./main/faq/faq";
import Footer from "./footer/footer";

const Parking = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  // const axiosPrivate = useAxiosPrivate();
  // useEffect(() => {
  //   dispatch(getGuestBookings(axiosPrivate));
  //   dispatch(getSlots(axiosPrivate));
  //   if (auth.role !== "connect_user") {
  //     dispatch(getClientBookings(axiosPrivate));
  //     dispatch(getVehiclesByUsername(axiosPrivate));
  //     dispatch(getDiscountsByUsername(axiosPrivate));
  //   }
  // }, []);

  return (
    <>
      <Intro />
      <Book />
      <Plan />
      <Banner />
      <Reviews />
      <Faq />
      <Footer />
    </>
  );
};

export default Parking;
