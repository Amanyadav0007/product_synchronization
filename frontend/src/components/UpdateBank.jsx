import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "./Input";

const UpdateBank = () => {
  const { backendUrl, profile, token, loading, setLoading } =
    useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bank: "",
    branch: "",
    account: "",
    ifsc: "",
  });

  useEffect(() => {
    if (profile) {
      setBankDetails({
        bank: profile.bank || "",
        branch: profile.branch || "",
        account: profile.account || "",
        ifsc: profile.ifsc || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isEditing) return;

    try {
      setLoading(true);
      const response = await axios.patch(
        `${backendUrl}/admin/bank`,
        bankDetails,
        { headers: { Authorization: `Bearer ${token}` } },
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
    <div className="border border-gray-200 my-2 rounded-2xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Bank Details</h2>

        {!isEditing ? (
          <p
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition"
          >
            Edit
          </p>
        ) : (
          <button
            type="submit"
            form="bank-form"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Save"}
          </button>
        )}
      </div>
      <form
        id="bank-form"
        onSubmit={onSubmitHandler}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input
          label="Bank Name"
          name="bank"
          value={bankDetails.bank}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <Input
          label="Branch"
          name="branch"
          value={bankDetails.branch}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <Input
          label="Account Number"
          name="account"
          value={bankDetails.account}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <Input
          label="IFSC Code"
          name="ifsc"
          value={bankDetails.ifsc}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </form>
    </div>
  );
};

export default UpdateBank;
