import { useAppSelector } from "../../../redux/hooks";
import BookingsList from "./bookingsList";

function UserBookings() {
  const bookings = useAppSelector((state) => state.booking);

  const sortedBookings = [...bookings.bookings].sort((a, b) => {
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
            <h3>My Bookings</h3>
            <p>Manage, modify, and measure your bookings with ease.</p>
          </div>
          <BookingsList bookings={sortedBookings} />
        </div>
      </section>
    </>
  );
}

export default UserBookings;
