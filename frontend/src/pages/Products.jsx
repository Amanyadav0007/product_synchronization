import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

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
          console.log(allProducts);

        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

  }, [token, setLoading, backendUrl]);


  return <div>
    gdhghdgf
  </div>;
};

export default Products;
