import UpdateBank from "../components/UpdateBank";
import UpdateBusiness from "../components/UpdateBusiness";
import UpdateTnc from "../components/UpdateTnc";

const Profile = () => {
  return (
    <div className="w-full m-6 bg-white">
      <UpdateBusiness />
      <UpdateBank />
      <UpdateTnc />
    </div>
  );
};

export default Profile;
