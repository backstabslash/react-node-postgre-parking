import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAppSelector } from "../../../redux/hooks";

function UserStats() {
  const auth = useAppSelector((state) => state.auth);
  const bookings = useAppSelector((state) => state.booking);
  const vehicles = useAppSelector((state) => state.vehicle);
  const discount = useAppSelector((state) => state.discount);
  const axiosPrivate = useAxiosPrivate();

  const [totalBooking, setTotalBookings] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [vehiclesCount, setVehiclesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBookings = await axiosPrivate.get(
          `/booking/totalbookings/username/${encodeURIComponent(auth.username)}`
        );
        const responseTime = await axiosPrivate.get(
          `/booking/totaltime/username/${encodeURIComponent(auth.username)}`
        );
        const responsePrice = await axiosPrivate.get(
          `/booking/avgprice/username/${encodeURIComponent(auth.username)}`
        );
        setTotalBookings(responseBookings.data.rows[0].total_bookings);
        setTotalTime(responseTime.data.rows[0].parking_time);
        setAvgPrice(responsePrice.data.rows[0].avg_cost_per_day ?? 0);
      } catch (error) {
        console.log("unlucky " + error);
      }
    };
    fetchData();
  }, [bookings.length]);

  return (
    <section className="profile_bookings-section">
      <div className="container">
        <div className="pick-container__title">
          <h3>Personal Statistics</h3>
          <p>
            Track your progress, uncover your potential: personal statistics at
            your fingertips.
          </p>
          <div className="stats-wrapper">
            <div className="stats-form__2col">
              <span>
                <label>Last discount:</label>
                <input
                  disabled={true}
                  value={
                    discount.discounts.length > 0
                      ? discount.discounts[0]?.start_date.substring(0, 10) +
                        " " +
                        discount.discounts[0]?.percentage +
                        "% for " +
                        (Date.parse(
                          discount.discounts[0]?.end_date.substring(0, 10)
                        ) -
                          Date.parse(
                            discount.discounts[0]?.start_date.substring(0, 10)
                          )) /
                          86400000 +
                        " days"
                      : "No available discounts"
                  }
                ></input>
              </span>
              <span>
                <label>Average Cost:</label>
                <input disabled={true} value={avgPrice + " ₴ per day"}></input>
              </span>
            </div>
            <div className="stats-form__3col">
              <span>
                <label>Total bookings count:</label>
                <input disabled={true} value={totalBooking}></input>
              </span>
              <span>
                <label>Total days parked:</label>
                <input disabled={true} value={totalTime}></input>
              </span>
              <span>
                <label>Vehicles count:</label>
                <input disabled={true} value={vehicles.vehicles.length}></input>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserStats;
