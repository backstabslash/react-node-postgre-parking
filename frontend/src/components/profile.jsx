import Footer from "../container/footer/footer";
import UserBookings from "../container/user-page/bookings/bookings";
import UserPersonal from "../container/user-page/personal/personal";
import UserStats from "../container/user-page/stats/stats";
import UserVehicles from "../container/user-page/vehicles/vehicles";

function Profile() {
  return (
    <section className="profile">
      <UserPersonal />
      <UserStats />
      <UserVehicles />
      <UserBookings />
      <Footer />
    </section>
  );
}

export default Profile;
