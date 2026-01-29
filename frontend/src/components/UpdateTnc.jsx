import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const UpdateTnc = () => {
  const { backendUrl, profile, token, loading, setLoading } =
    useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [tnc, setTnc] = useState([""]);

  useEffect(() => {
    if (!profile) return;

    if (profile.tnc?.length > 0) {
      setTnc(profile.tnc);
      setIsEditing(false);
    } else {
      setTnc([""]);
      setIsEditing(true);
    }
  }, [profile]);

  const addTncRow = () => setTnc((prev) => [...prev, ""]);

  const removeTncRow = (index) => {
    if (tnc.length === 1) return;
    setTnc((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index, value) => {
    const updated = [...tnc];
    updated[index] = value;
    setTnc(updated);
  };

  const onTncUpdate = async (e) => {
    e.preventDefault();
    if (!isEditing) return;

    const cleanedTnc = tnc.filter((item) => item.trim());

    if (cleanedTnc.length === 0) {
      toast.error("Please add at least one Terms & Condition");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.patch(
        `${backendUrl}/admin/tnc`,
        { tnc: cleanedTnc },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setIsEditing(false);
        setTnc(cleanedTnc);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3 sm:px-0">
      <form
        onSubmit={onTncUpdate}
        className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 sm:p-6 space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-xl font-semibold text-gray-800">
            Terms & Conditions
          </h2>

          {!isEditing ? (
            <p
              onClick={() => setIsEditing(true)}
              className="self-start cursor-pointer sm:self-auto px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition"
            >
              Edit
            </p>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="self-start sm:self-auto px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        <div className="space-y-3">
          {tnc.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center"
            >
              <input
                type="text"
                value={item}
                disabled={!isEditing}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder={`T&C ${index + 1}`}
                className={`flex-1 px-3 py-2 rounded-lg border outline-none transition
                  ${
                    !isEditing
                      ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                      : "bg-white border-gray-300 focus:ring-2 focus:ring-green-500"
                  }`}
              />

              {isEditing && (
                <div className="flex items-center gap-2">
                  {index === tnc.length - 1 && (
                    <CiCirclePlus
                      onClick={addTncRow}
                      title="Add"
                      className="text-green-600 cursor-pointer text-2xl hover:scale-110 transition"
                    />
                  )}

                  {tnc.length > 1 && (
                    <CiCircleMinus
                      onClick={() => removeTncRow(index)}
                      title="Remove"
                      className="text-red-600 cursor-pointer text-2xl hover:scale-110 transition"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default UpdateTnc;
