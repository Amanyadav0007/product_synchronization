import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

const Addproduct = () => {
  const [loading, setLoading] = useState(false);
  const { backendUrl, token, navigate } = useContext(AppContext);

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/product/add`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
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
    <div className="w-full md:m-6 m-2">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Add Product</h2>
          <button
            onClick={() => navigate("/")}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <RxCross2 className="text-2xl text-gray-600" />
          </button>
        </div>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <Input
            label="Name"
            name="name"
            placeholder="Enter Product Name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Brand"
            name="brand"
            placeholder="Enter Brand Name"
            value={product.brand}
            onChange={handleChange}
            required
          />

          <Input
            label="Price"
            name="price"
            type="number"
            placeholder="₹0.00"
            value={product.price}
            onChange={handleChange}
            required
          />

          <Input
            label="Quantity"
            name="quantity"
            type="number"
            placeholder="0"
            value={product.quantity}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="
            self-end mt-2
            px-6 py-2 rounded-lg
            bg-green-600 text-white font-medium
            hover:bg-green-700
            transition
            disabled:opacity-60
          "
          >
            {loading ? "Submitting..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className={`mt-1 px-3 py-2 rounded-lg border outline-none transition
      `}
    />
  </div>
);

export default Addproduct;
