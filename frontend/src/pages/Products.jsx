import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Product from "../components/Product";
import { CiEdit, CiTrash } from "react-icons/ci";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const { backendUrl, token } = useContext(AppContext);

  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onEditHandler = async (id) => {
    try {
      setEditLoading(true);
      const response = await axios.patch(
        `${backendUrl}/product/edit/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        setAllProducts((prev) => prev.filter((item) => item._id !== id));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
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
        setAllProducts((prev) => prev.filter((item) => item._id !== id));
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/product`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setAllProducts(response.data.products);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProducts();
  }, [token, backendUrl, setLoading]);

  return (
    <div className="w-full md:m-6 m-2">
      <div className="grid grid-cols-6 gap-4 bg-gray-800 text-white rounded-t-xl font-semibold border-b p-3">
        <p>S.No.</p>
        <p>Name</p>
        <p>Brand</p>
        <p>Price</p>
        <p className="text-center">Quantity</p>
        <p className="text-center">Action</p>
      </div>

      {loading && <p>Loading...</p>}
      {allProducts.map((product, index) => (
        <div
          key={product._id}
          className="grid grid-cols-6 items-center border-b border-gray-300 p-3"
        >
          <p className="text-gray-500">{index + 1}</p>
          <p className="font-medium">{product.name}</p>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <p>₹{product.price}</p>
          <p className="font-medium text-center">{product.quantity}</p>
          <div className="flex items-center justify-center gap-3">
            <CiEdit
              onClick={
                !editLoading ? () => onEditHandler(product._id) : undefined
              }
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
      ))}
    </div>
  );
};

export default Products;
