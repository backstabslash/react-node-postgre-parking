import UserPersonal from "../container/user-page/personal/personal";
import UserVehicles from "../container/user-page/vehicles/vehicles";

function Profile() {
  return (
    <section className="profile">
      <UserVehicles />
      <UserPersonal />
    </section>
  );
}

export default Profile;
