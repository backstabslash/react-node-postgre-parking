import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import {
  deleteVehicleById,
  postVehicle,
  updateVehicleById,
} from "../../../redux/vehicle";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function CarBox({ vehicle, username }) {
  const [modifyingData, setModifyingData] = useState(true);
  const [brand, setBrand] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [validPlateNumber, setValidPlateNumber] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (Object.keys(vehicle).length > 0) {
      setBrand(vehicle.brand);
      setPlateNumber(vehicle.plate_number);
      setCategory(vehicle.vehicle_category);
    }
  }, [vehicle]);

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const PLATE_REGEX = /^[A-Z]{2}\d{4}[A-Z]{2}$/;

  useEffect(() => {
    setValidPlateNumber(PLATE_REGEX.test(plateNumber));
  }, [plateNumber]);

  const handleModifyChange = (e) => {
    setModifyingData(!modifyingData);
  };

  const handleSaveChanges = (e) => {
    if (
      PLATE_REGEX.test(plateNumber) &&
      brand.length > 1 &&
      brand.length < 20 &&
      category !== ""
    ) {
      vehicle.newVeh
        ? dispatch(
            postVehicle({
              axiosPrivate,
              username,
              vehicle_category: category,
              brand,
              plate_number: plateNumber,
            })
          ).unwrap()
        : // .then((e) => console.log(e))
          dispatch(
            updateVehicleById({
              axiosPrivate,
              vehicle_id: vehicle.vehicle_id,
              vehicle_category: category,
              brand,
              plate_number: plateNumber,
            })
          ).unwrap();
      // .then((e) => console.log(e));
      handleModifyChange();
    }
  };

  const handleDeleteVehicle = (e) => {
    dispatch(
      deleteVehicleById({ axiosPrivate, vehicle_id: vehicle.vehicle_id })
    ).unwrap();
    // .then((e) => console.log(e));
  };

  const handleBrand = (e) => {
    setBrand(e.target.value);
  };

  const handlePlateNumber = (e) => {
    setPlateNumber(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      {vehicle ? (
        <>
          <div className="pick-description">
            <form className="vehicle-form">
              <div className="vehicle-form__2col">
                <span>
                  <label>Vehicle Brand</label>
                  <input
                    value={brand}
                    onChange={handleBrand}
                    type="text"
                    placeholder="Enter your vehicle brand"
                    disabled={modifyingData}
                  ></input>
                </span>

                <span>
                  <label>Plate Number</label>
                  <input
                    value={plateNumber}
                    onChange={handlePlateNumber}
                    type="text"
                    placeholder="Enter your plate number"
                    disabled={modifyingData}
                  ></input>
                  <p
                    className={
                      plateNumber && !validPlateNumber
                        ? "instructions-profile"
                        : "offScreen"
                    }
                  >
                    Should match XX9999XX
                  </p>
                </span>
              </div>
              <div className="vehicle-form__1col">
                <span>
                  <label>Vehicle Type</label>
                  <select
                    value={category}
                    onChange={handleCategory}
                    className="veh-type-select"
                    disabled={modifyingData}
                  >
                    <option value="">Select your vehicle type</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Car">Car</option>
                    <option value="Bus">Bus</option>
                    <option value="Truck">Truck</option>
                  </select>
                </span>
              </div>
            </form>
          </div>
          <div className="pick-box">
            <button
              className="profile-veh-btn edit-btn"
              onClick={handleModifyChange}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
              </svg>
              Alter Records
            </button>
            <button
              className="profile-veh-btn del-btn"
              onClick={handleDeleteVehicle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clipRule="evenodd"
                />
              </svg>
              Delete Vehicle
            </button>
            <button
              className="profile-veh-btn save-btn"
              onClick={handleSaveChanges}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clipRule="evenodd"
                />
              </svg>
              Update Details
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default CarBox;
