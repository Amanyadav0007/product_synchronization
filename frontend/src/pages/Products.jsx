import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Product from "../components/Product";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const { backendUrl, token, loading, setLoading } = useContext(AppContext);

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
    <div className="w-full p-4">
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
        <Product key={product._id} index={index} product={product} />
      ))}
    </div>
  );
};

export default Products;
