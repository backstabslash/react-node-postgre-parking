import UsersAdmin from "../container/admin-page/user-controller/users";
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
      {auth.role === "client" ? (
        <>
          <UserPersonal />
          <UserStats />
          <UserVehicles />
          <UserBookings />
        </>
      ) : auth.role === "administrator" ? (
        <>
          <UsersAdmin />
        </>
      ) : (
        <></>
      )}
      <Footer bg={true} />
    </section>
  );
}

export default Profile;
