import { useAppSelector } from "../../../redux/hooks";
import BookingsList from "./bookingsList";

function UsersBookings({ vehicles, user }) {
  const bookings = useAppSelector((state) => state.booking.bookings);

  let filtered = bookings?.filter((booking) =>
    vehicles.some((vehicle) => vehicle.vehicle_id === booking.vehicle_id)
  );

  filtered = [...filtered].sort((a, b) => {
    const statusOrder = {
      ongoing: 0,
      upcoming: 1,
      completed: 2,
      canceled: 3,
    };

    const statusA = a.status;
    const statusB = b.status;

    return statusOrder[statusA] - statusOrder[statusB];
  });

  return (
    <>
      <section className="profile_bookings-section">
        <div className="container">
          <div className="pick-container__title">
            <h3>{user?.username} Bookings</h3>
            <p>Manage, modify, and measure bookings with ease.</p>
          </div>
          {filtered.length > 0 ? (
            <BookingsList bookings={filtered} />
          ) : (
            <h3 className="no-bookings">This user has no bookings</h3>
          )}
        </div>
      </section>
    </>
  );
}

export default UsersBookings;
