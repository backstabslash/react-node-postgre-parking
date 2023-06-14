import React, { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import SlotsList from "./slotsList";

function AdminSlots() {
  const slots = useAppSelector((state) => state.slot.slots);
  const [vehCat, setVehCat] = useState("");
  const [plate, setPlate] = useState("");
  let filteredSlots = slots.filter((slot) => slot.vehicle_category === vehCat);
  const handleVehCategory = (e) => {
    setVehCat(e.target.value);
  };

  const handlePlateChange = (e) => {
    if (vehCat !== "") setPlate(e.target.value);
  };

  return (
    <>
      <section className="profile_bookings-section">
        <div className="container">
          <div className="pick-container__title">
            <h3>Slots</h3>
            <p>Manage, modify, and measure slots with ease.</p>
          </div>
          <div
            className="vehicle-form__2col"
            style={{ justifyContent: "center" }}
          >
            <span
              className="bookings-list-elem-data"
              style={{ paddingBottom: "0" }}
            >
              <select
                className="veh-type-select"
                value={vehCat}
                onChange={handleVehCategory}
              >
                <option value="" disabled={true}>
                  Select vehicle category
                </option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Truck">Truck</option>
                <option value="Car">Car</option>
                <option value="Bus">Bus</option>
              </select>
            </span>
            <span
              className="bookings-list-elem-data"
              style={{ paddingBottom: "0" }}
            >
              <label style={{ color: "#010103", marginBottom: "0.4rem" }}>
                Plate Number
              </label>
              <input
                className="user-search-input"
                value={plate}
                onChange={handlePlateChange}
                type="text"
              ></input>
            </span>
          </div>
          <SlotsList slots={filteredSlots} plate={plate} />
        </div>
      </section>
    </>
  );
}

export default AdminSlots;
