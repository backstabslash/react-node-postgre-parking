import { useAppSelector } from "../../../redux/hooks";
import React, { useState, useEffect } from "react";
import CarBox from "./carBox";

function UserVehicles() {
  const vehicles = useAppSelector((state) => state.vehicle.vehicles);

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
                  className={`${coloringButton("newVeh")} veh-btns-add`}
                  onClick={() => {
                    if ("newVeh" !== active) {
                      setActive("newVeh");
                      btnID("newVeh");
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add New Vehicle
                </button>
              </div>
              <CarBox
                vehicle={
                  active === "newVeh"
                    ? {
                        brand: "",
                        plate_number: "",
                        vehicle_category: "",
                        newVeh: true,
                      }
                    : vehicle
                }
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserVehicles;
