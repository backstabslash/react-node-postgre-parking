import { useAppSelector } from "../../redux/hooks";
import React, { useState, useEffect } from "react";
import CarBox from "./carBox";

function UserVehicles() {
  const auth = useAppSelector((state) => state.auth);
  const bookings = useAppSelector((state) => state.booking.bookings);
  const vehicles = useAppSelector((state) => state.vehicle.vehicles);
  const discounts = useAppSelector((state) => state.discount.discounts);

  const [active, setActive] = useState("");
  const [vehicle, setVehicle] = useState({});
  const [colorBtn, setColorBtn] = useState("");

  useEffect(() => {
    for (const vehicle of vehicles)
      vehicle.plate_number === active && setVehicle(vehicle);
  }, [active]);

  useEffect(() => {
    if (vehicles.length > 0) {
      setActive(vehicles[0].plate_number);
      btnID(vehicles[0].plate_number);
      setVehicle(vehicles[0]);
    }
  }, [vehicles.length]);

  const btnID = (id) => {
    setColorBtn(colorBtn === id ? "" : id);
  };

  const coloringButton = (id) => {
    return colorBtn === id ? "colored-button" : "";
  };

  return (
    <>
      <section className="profile__vehicles-section">
        <div className="container">
          <div className="pick-container">
            <div className="pick-container__title">
              <h3>My Vehicles</h3>
              <p>
                Add, edit, or delete vehicles effortlessly, ensuring accurate
                information for a seamless parking experience.
              </p>
            </div>
            <div className="pick-container__car-content">
              <div className="pick-box">
                {vehicles.map((vehicle) => (
                  <button
                    className={`${coloringButton(
                      vehicle.plate_number
                    )} veh-btns`}
                    key={vehicle.plate_number}
                    onClick={() => {
                      if (vehicle.plate_number !== active) {
                        setActive(vehicle.plate_number);
                        btnID(vehicle.plate_number);
                      }
                    }}
                  >
                    {vehicle.brand + " " + vehicle.plate_number}
                  </button>
                ))}
                <button
                  className={`${coloringButton(
                    "newVeh"
                  )} profile-veh-btn save-btn`}
                  onClick={() => {
                    if ("newVeh" !== active) {
                      setActive("newVeh");
                      btnID("newVeh");
                    }
                  }}
                >
                  + Add New Vehicle
                </button>
              </div>
              <CarBox vehicle={vehicle} />
              <div className="pick-box">
                <button className="edit-btn profile-veh-btn" onClick={() => {}}>
                  Edit Data
                </button>
                <button className="save-btn profile-veh-btn" onClick={() => {}}>
                  Save Changes
                </button>
                <button
                  className="delete-btn profile-veh-btn"
                  onClick={() => {}}
                >
                  Delete Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserVehicles;
