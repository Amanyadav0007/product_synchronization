import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Addproduct from "../components/Addproduct";
import Sidebar from "../components/Sidebar";
import Products from "./Products";


const Home = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<Addproduct />} />
        </Routes>
      </div>
    </>
  );
};

export default Home;
