import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parking from "./container/parking";
import Register from "./components/register";
import LoginPage from "./components/login";
import PersistLogin from "./components/PersistLogin";
import "./styles/styles.scss";
import Header from "./container/header/header";
import About from "./components/about";
import ReviewsPage from "./components/reviewspage";
import Team from "./components/team";
import Contact from "./components/contact";
import Profile from "./components/profile";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getAllBookings,
  getClientBookings,
  getGuestBookings,
} from "./redux/booking";
import { getSlots } from "./redux/slot";
import { useAppDispatch } from "./redux/hooks";
import { getVehicles, getVehiclesByUsername } from "./redux/vehicle";
import { getDiscounts, getDiscountsByUsername } from "./redux/discount";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { getUsers } from "./redux/user";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    dispatch(getSlots(axiosPrivate));
    dispatch(getGuestBookings(axiosPrivate));
  }, []);

  useEffect(() => {
    if (auth.role === "client") {
      dispatch(getClientBookings(axiosPrivate));
      dispatch(getVehiclesByUsername(axiosPrivate));
      dispatch(getDiscountsByUsername(axiosPrivate));
    }
    if (auth.role === "administrator") {
      dispatch(getAllBookings(axiosPrivate));
      dispatch(getVehicles(axiosPrivate));
      dispatch(getUsers(axiosPrivate));
      dispatch(getDiscounts(axiosPrivate));
    }
  }, [auth.role]);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/sign_up" element={<Register />} />
          <Route path="/sign_in" element={<LoginPage />} />
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Parking />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile*" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
