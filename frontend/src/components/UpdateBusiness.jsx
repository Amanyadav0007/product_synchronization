import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateBusiness = () => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [businessDetails, setBusinessDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    gst: "",
    pan: "",
    msme: "",
  });

  const { backendUrl, profile, token } = useContext(AppContext);

  useEffect(() => {
    if (profile) {
      setBusinessDetails({
        name: profile.business || "",
        phone: profile.phone || "",
        address: profile.address || "",
        city: profile.city || "",
        state: profile.state || "",
        pin: profile.pin || "",
        gst: profile.gst || "",
        pan: profile.pan || "",
        msme: profile.msme || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails((prev) => ({ ...prev, [name]: value }));
  };

  const onBusinessUpdate = async (e) => {
    e.preventDefault();
    if (!isEditing) return;

    try {
      setLoading(true);

      const response = await axios.patch(
        `${backendUrl}/admin/business`,
        businessDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onBusinessUpdate}
      className="p-6 rounded-2xl shadow border border-gray-200 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Business Details</h2>

        {!isEditing ? (
          <p
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-lg bg-amber-600 text-white"
          >
            Edit
          </p>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-green-600 text-white"
          >
            {loading ? "Updating..." : "Save"}
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Business Name"
          name="name"
          value={businessDetails.name}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <Input
          label="Phone Number"
          name="phone"
          value={businessDetails.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <Input
          label="GST Number"
          name="gst"
          value={businessDetails.gst}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <Input
          label="PAN Number"
          name="pan"
          value={businessDetails.pan}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <Input
          label="MSME Number"
          name="msme"
          value={businessDetails.msme}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <Input
          label="Address"
          name="address"
          value={businessDetails.address}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <div className="flex gap-6">
          <Input
            label="City"
            name="city"
            value={businessDetails.city}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <Input
            label="State"
            name="state"
            value={businessDetails.state}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <Input
            label="Pin"
            name="pin"
            value={businessDetails.pin}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>
    </form>
  );
};

const Input = ({ label, disabled, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium">{label}</label>
    <input
      {...props}
      disabled={disabled}
      className="mt-1 border px-3 py-2 rounded-lg disabled:bg-gray-100"
    />
  </div>
);

export default UpdateBusiness;
