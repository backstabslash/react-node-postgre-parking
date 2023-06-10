import { useEffect, useState } from "react";
import Motorcycle from "../../../images/book/motorcycle.png";
import Car from "../../../images/book/car.png";
import Truck from "../../../images/book/truck.png";
import Bus from "../../../images/book/bus.png";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { postBooking } from "../../../redux/booking";

function Book() {
  const vehicles = useAppSelector((state) => state.vehicle);
  const auth = useAppSelector((state) => state.auth);
  const slots = useAppSelector((state) => state.slot);
  const bookings = useAppSelector((state) => state.booking.bookings);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [properVehicles, setProperVehicles] = useState([]);
  const [properSlots, setProperSlots] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [modal, setModal] = useState(false);

  const [vehicleType, setVehicleType] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [vehicleImg, setVehicleImg] = useState("");

  const [name, setName] = useState(
    auth.fullName?.substring(0, auth.fullName.indexOf(" ")) || ""
  );
  const [lastName, setLastName] = useState(
    auth.fullName?.substring(auth.fullName.indexOf(" ") + 1) || ""
  );
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("18");
  const [wantedVehicle, setWantedVehicle] = useState("");
  const [wantedSlot, setWantedSlot] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");

  const PHONE_REGEX = /^(\+\d{1,2}\s)\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const FULLNAME_REGEX = /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/;

  useEffect(() => {
    if (auth.accessToken) {
      const properVehicles = vehicles.vehicles.filter(
        (vehicle) => vehicle.vehicle_category === vehicleType
      );
      setProperVehicles(properVehicles);
    }
    const properSlots = slots.slots.filter(
      (slot) => slot.vehicle_category === vehicleType
    );
    setProperSlots(properSlots);
    setTotalPrice(0);
    setWantedSlot("");
    setWantedVehicle("");
    setPhone(auth.phoneNumber || "");
  }, [vehicleType, modal]);

  useEffect(() => {
    if (auth.accessToken) {
      if (wantedSlot !== "") {
        const slot = slots.slots.filter((slot) => slot.slot_id === wantedSlot);
        setTotalPrice(
          ((Date.parse(departureTime) - Date.parse(arrivalTime)) / 86400000) *
            slot[0].price
        );
      } else setTotalPrice(0);
    }
  }, [wantedSlot]);

  const handleWantedVehicle = (e) => {
    setWantedVehicle(e.target.value);
  };

  const handleWantedSlot = (e) => {
    setWantedSlot(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleZip = (e) => {
    setZipCode(e.target.value);
  };

  const openModal = (e) => {
    e.preventDefault();
    const errorMsgEmpty = document.querySelector(".error-message-empty");
    const errorMsgDates = document.querySelector(".error-message-dates");
    if (arrivalTime === "" || departureTime === "" || vehicleType === "")
      errorMsgEmpty.style.display = "flex";
    else if (
      arrivalTime > departureTime ||
      Date.parse(arrivalTime) + 86400000 < Date.now()
    ) {
      console.log(Date.parse(arrivalTime) + 86400000, Date.now());
      errorMsgDates.style.display = "flex";
    } else {
      setModal(!modal);
      const modalDiv = document.querySelector(".booking-modal");
      modalDiv.scroll(0, 0);
      errorMsgEmpty.style.display = "none";
      errorMsgDates.style.display = "none";
    }
  };

  useEffect(() => {
    if (modal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [modal]);

  const confirmBooking = (e) => {
    e.preventDefault();
    if (
      FULLNAME_REGEX.test(name + " " + lastName) &&
      PHONE_REGEX.test(phone) &&
      age > 17 &&
      wantedSlot !== "" &&
      wantedVehicle !== "" &&
      email.includes("@") &&
      email.length > 5
    ) {
      setModal(!modal);
      const doneMsg = document.querySelector(".booking-done");
      doneMsg.style.display = "flex";
      const vehicle_id = wantedVehicle,
        slot_id = wantedSlot;
      dispatch(
        postBooking({
          axiosPrivate,
          start_date: arrivalTime,
          end_date: departureTime,
          vehicle_id,
          slot_id,
          amount_due: totalPrice,
        })
      )
        .unwrap()
        .then((e) => console.log(e));
    }
  };

  const handleVehicle = (e) => {
    setVehicleType(e.target.value);
    switch (e.target.value) {
      case "Motorcycle":
        setVehicleImg(Motorcycle);
        break;
      case "Car":
        setVehicleImg(Car);
        break;
      case "Bus":
        setVehicleImg(Bus);
        break;
      case "Truck":
        setVehicleImg(Truck);
        break;
      default:
        setVehicleImg("");
    }
  };

  const handleArrivalTime = (e) => {
    setArrivalTime(e.target.value);
  };

  const handleDepartureTime = (e) => {
    setDepartureTime(e.target.value);
  };

  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    const errorMsgEmpty = document.querySelector(".error-message-empty");
    const errorMsgDates = document.querySelector(".error-message-dates");
    errorMsgEmpty.style.display = "none";
    errorMsgDates.style.display = "none";
    doneMsg.style.display = "none";
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

  const getVehicles = () => {
    return properVehicles.map((vehicle) => {
      const isDisabled =
        bookings.filter(
          (book) =>
            (book.status === "ongoing" || book.status === "upcoming") &&
            book.vehicle_id === vehicle.vehicle_id
        ).length > 0;
      return (
        <option
          value={vehicle.vehicle_id}
          key={vehicle.vehicle_id}
          disabled={isDisabled}
        >
          {vehicle.brand + " " + vehicle.plate_number}
        </option>
      );
    });
  };

  return (
    <>
      <section id="booking-section" className="book-section">
        <div
          onClick={openModal}
          className={`modal-overlay ${modal ? "active-modal" : ""}`}
        ></div>
        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a Slot</h2>
              <p className="error-message-empty">
                All fields are required!{" "}
                <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>
              <p className="error-message-dates">
                Arrival date can't be less than the current date or departure
                date!{" "}
                <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>
              <p className="booking-done">
                Your slot is reserved now!
                <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>
              <form className="box-form">
                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Arrival Date <b>*</b>
                  </label>
                  <input
                    id="picktime"
                    value={arrivalTime}
                    onChange={handleArrivalTime}
                    type="date"
                  ></input>
                </div>
                <div className="box-form__car-time">
                  <label htmlFor="droptime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Departure Date <b>*</b>
                  </label>
                  <input
                    id="droptime"
                    value={departureTime}
                    onChange={handleDepartureTime}
                    type="date"
                  ></input>
                </div>
                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-car"></i> &nbsp; Vehicle Type{" "}
                    <b>*</b>
                  </label>
                  <select value={vehicleType} onChange={handleVehicle}>
                    <option value="">Select your car type</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Car">Car</option>
                    <option value="Bus">Bus</option>
                    <option value="Truck">Truck</option>
                  </select>
                </div>
                <button onClick={openModal} type="submit">
                  Complete Reservation
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
        <div className="booking-modal__message">
          <h4>After submitting your reservation request </h4>
          <i onClick={openModal} className="fa-solid fa-xmark"></i>
        </div>
        <div className="booking-modal__lowermessage">
          <p>
            you will receive a rental voucher to present at the rental desk upon
            arrival, along with a toll-free customer support number.
          </p>
        </div>
        <div className="booking-modal__car-info">
          <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Arrival Date</h6>
                  <p>{arrivalTime}</p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Departure Date</h6>
                  <p>{departureTime}</p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-car"></i>
                <div>
                  <h6>Vehicle Type</h6>
                  <p> {vehicleType}</p>
                </div>
              </span>
            </div>
          </div>
          {vehicleImg !== "" && <img src={vehicleImg} alt="car_img" />}
        </div>

        <div
          className={`booking-modal__person-info ${
            auth.accessToken ? "" : "disabled"
          }`}
        >
          <h4>
            Personal Information{" "}
            {auth.accessToken ? (
              ""
            ) : (
              <span>
                <br></br>
                Sign in to do anything other than check slots availability
              </span>
            )}
          </h4>
          <form className="info-form">
            <div className="info-form__2col">
              <span>
                <label>
                  First Name <b>*</b>
                </label>
                <input
                  value={name}
                  onChange={handleName}
                  type="text"
                  placeholder="Enter your first name"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Last Name <b>*</b>
                </label>
                <input
                  value={lastName}
                  onChange={handleLastName}
                  type="text"
                  placeholder="Enter your last name"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>

              <span>
                <label>
                  Phone Number <b>*</b>
                </label>
                <input
                  value={phone}
                  onChange={handlePhone}
                  type="tel"
                  placeholder="Enter your phone number"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Age <b>*</b>
                </label>
                <input
                  value={age}
                  onChange={handleAge}
                  type="number"
                  placeholder="18"
                ></input>
                <p className="error-modal ">
                  This field is required. You must be at least 18 years old.
                </p>
              </span>

              <span>
                <label>
                  Wanted {vehicleType} <b>*</b>
                </label>
                <select value={wantedVehicle} onChange={handleWantedVehicle}>
                  <option value="">Select wanted vehicle</option>
                  {getVehicles()}
                </select>
                <p className="error-modal ">This field is required.</p>
              </span>

              <span>
                <label>
                  Parking Slot <b>*</b>
                </label>
                <select
                  value={wantedSlot}
                  onChange={handleWantedSlot}
                  className="enabled"
                >
                  <option value="">Select parking slot</option>
                  {getSlots()}
                </select>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <div className="info-form__1col">
              <span>
                <label>
                  Email <b>*</b>
                </label>
                <input
                  value={email}
                  onChange={handleEmail}
                  type="email"
                  placeholder="Enter your email address"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>Address</label>
                <input
                  value={address}
                  onChange={handleAddress}
                  type="text"
                  placeholder="Enter your street address"
                ></input>
              </span>
            </div>

            <div className="info-form__2col">
              <span>
                <label>City</label>
                <input
                  value={city}
                  onChange={handleCity}
                  type="text"
                  placeholder="Enter your city"
                ></input>
              </span>

              <span>
                <label>Zip Code</label>
                <input
                  value={zipcode}
                  onChange={handleZip}
                  type="text"
                  placeholder="Enter your zip code"
                ></input>
              </span>
            </div>

            <span className="info-form__checkbox">
              <p>
                <input type="checkbox"></input> &nbsp; Subscribe to our
                newsletter
              </p>
              <span>
                <p>Total price: {totalPrice} ₴</p>{" "}
                <button onClick={confirmBooking}>Reserve Now</button>
              </span>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default Book;
