import axios from "axios";
import { useContext, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";
import AppContext from "../context/AppContext";

const Product = ({ index, product }) => {
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { backendUrl, token } = useContext(AppContext);

  const onEditHandler = async (id) => {
    try {
      setEditLoading(true);
      const response = await axios.patch(
        `${backendUrl}/product/edit/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast[response.data.success ? "success" : "error"](response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setEditLoading(false);
    }
  };

  const onDeleteHandler = async (id) => {
    try {
      setDeleteLoading(true);
      const response = await axios.delete(
        `${backendUrl}/product/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-6 items-center border-b border-gray-300 p-3">
      <p className="text-gray-500">{index + 1}</p>
      <p className="font-medium">{product.name}</p>
      <p className="text-sm text-gray-500">{product.brand}</p>
      <p>₹{product.price}</p>
      <p className="font-medium text-center">{product.quantity}</p>
      <div className="flex items-center justify-center gap-3">
        <CiEdit
          onClick={!editLoading ? () => onEditHandler(product._id) : undefined}
          className={`text-xl transition-all ${
            editLoading
              ? "animate-spin text-gray-400 cursor-not-allowed"
              : "text-blue-500 cursor-pointer hover:scale-110"
          }
        `}
        />

        <CiTrash
          onClick={
            !deleteLoading ? () => onDeleteHandler(product._id) : undefined
          }
          className={`text-xl transition-all ${
            deleteLoading
              ? "animate-spin text-gray-400 cursor-not-allowed"
              : "text-red-500 cursor-pointer hover:scale-110"
          }`}
        />
      </div>
    </div>
  );
};

export default Product;
