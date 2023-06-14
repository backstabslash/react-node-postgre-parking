import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import UsersTop from "./usersTop";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function AdminStats() {
  const axiosPrivate = useAxiosPrivate();
  const slots = useAppSelector((state) => state.slot.slots);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [canceledPercentage, setCanceledPercentage] = useState(0);
  const [avgParkingTime, setAvgParkingTime] = useState(0);
  const [income, setIncome] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [popVeh, setPopVeh] = useState(0);

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const percentage = await axiosPrivate.get(`/booking/canceledtoall`, {});
        const days = await axiosPrivate.get(`/booking/getavgparking`, {});
        setCanceledPercentage(percentage.data.rows[0].cancellation_percentage);
        setAvgParkingTime(days.data.rows[0].average_parking_duration);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (
      startDate !== "" &&
      endDate !== "" &&
      Date.parse(startDate) <= Date.parse(endDate)
    ) {
      const fetchData = async () => {
        try {
          const income = await axiosPrivate.get(
            `/booking/datesincome/${encodeURIComponent(
              startDate
            )}/${encodeURIComponent(endDate)}`
          );
          const bookings = await axiosPrivate.get(
            `/booking/datesbookings/${encodeURIComponent(
              startDate
            )}/${encodeURIComponent(endDate)}`
          );
          const vehicles_cats = await axiosPrivate.get(
            `/booking/datesvehicles/${encodeURIComponent(
              startDate
            )}/${encodeURIComponent(endDate)}`
          );
          setPopVeh(vehicles_cats.data.rows);
          setIncome(income.data.rows[0].total_amount);
          setBookings(bookings.data.rows[0].booking_count);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [startDate, endDate]);

  return (
    <>
      <section className="profile_bookings-section">
        <div className="container">
          <div className="pick-container__title">
            <h3>Stats</h3>
            <p>Admin Analytics: empowering better business decisions</p>
          </div>
          <div
            className="vehicle-form__2col"
            style={{ justifyContent: "center" }}
          >
            <span className="bookings-list-elem-data">
              <label style={{ color: "#010103", marginBottom: "0.4rem" }}>
                Start Date
              </label>
              <input
                className="user-search-input"
                value={startDate}
                onChange={handleStartDate}
                type="date"
              ></input>
            </span>
            <span className="bookings-list-elem-data">
              <label style={{ color: "#010103", marginBottom: "0.4rem" }}>
                End Date
              </label>
              <input
                className="user-search-input"
                value={endDate}
                onChange={handleEndDate}
                type="date"
              ></input>
            </span>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>
                  Canceled / Other Bookings <br />
                  (All Time)
                </th>
                <th>
                  Average Parking Time <br />
                  (All Time)
                </th>
                <th>
                  Income <br />
                  (Date Dependant)
                </th>
                <th>
                  Bookings <br />
                  (Date Dependant)
                </th>
                <th>
                  Vehicle Category / Bookings <br />
                  (Date Dependant)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{canceledPercentage}</td>
                <td>{avgParkingTime}</td>
                <td>{income}</td>
                <td>{bookings}</td>
                {popVeh.length > 0 ? (
                  popVeh.map((object, index) => (
                    <tr key={index}>
                      <td className="table-last-column">
                        {object.vehicle_category + " " + object.bookings_count}
                      </td>
                    </tr>
                  ))
                ) : (
                  <td>0</td>
                )}
              </tr>
            </tbody>
          </table>
          <UsersTop />
        </div>
      </section>
    </>
  );
}

export default AdminStats;
