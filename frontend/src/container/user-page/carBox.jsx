function CarBox({ vehicle }) {
  return (
    <>
      {vehicle ? (
        <div className="pick-description">
          <form className="vehicle-form">
            <div className="vehicle-form__2col">
              <span>
                <label>Vehicle Brand</label>
                <input
                  //   value={address}
                  //   onChange={handleAddress}
                  type="text"
                  placeholder="Enter your vehicle brand"
                ></input>
              </span>

              <span>
                <label>Plate Number</label>
                <input
                  //   value={city}
                  //   onChange={handleCity}
                  type="text"
                  placeholder="Enter your plate number"
                ></input>
              </span>
            </div>
            <div className="vehicle-form__1col">
              <span>
                <label>Vehicle Type</label>
                <select //</span>value={vehicleType} onChange={handleVehicle}
                  className="veh-type-select"
                >
                  <option value="">Select your car type</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Car">Car</option>
                  <option value="Bus">Bus</option>
                  <option value="Truck">Truck</option>
                </select>
              </span>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default CarBox;
