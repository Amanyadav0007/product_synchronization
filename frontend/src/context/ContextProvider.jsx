import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "./AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const ContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [profile, setProfile] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios(`${backendUrl}/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setProfile(response.data.profile);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    fetchProfile();
  }, [backendUrl, token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const value = useMemo(
    () => ({
      backendUrl,
      token,
      profile,
      setProfile,
      navigate,
      setToken,
    }),
    [backendUrl, token, profile, navigate],
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;
