import Footer from "../container/footer/footer";
import UserBookings from "../container/user-page/bookings/bookings";
import UserPersonal from "../container/user-page/personal/personal";
import UserStats from "../container/user-page/stats/stats";
import UserVehicles from "../container/user-page/vehicles/vehicles";
import { useAppSelector } from "../redux/hooks";

function Profile() {
  const auth = useAppSelector((state) => state.auth);
  return (
    <section className="profile">
      <UserPersonal />
      {auth.role === "client" ? (
        <>
          <UserStats />
          <UserVehicles />
          <UserBookings />
        </>
      ) : auth.role === "administrator" ? (
        <>{/* Administrator-specific component(s) */}</>
      ) : (
        <></>
      )}
      <Footer />
    </section>
  );
}

export default Profile;
