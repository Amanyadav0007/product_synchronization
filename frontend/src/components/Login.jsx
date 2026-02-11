import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "../context/AppContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToken, backendUrl } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url =
        state === "Login"
          ? `${backendUrl}/admin/login`
          : `${backendUrl}/admin/register`;

      const payload =
        state === "Login" ? { email, password } : { name, email, password };

      const response = await axios.post(url, payload);

      if (response.data.success) {
        setToken(response.data.token);
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
    <form
      onSubmit={onSubmitHandler}
      className="w-full border rounded-2xl shadow border-gray-100 max-w-md mx-auto p-4 space-y-4"
    >
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl font-semibold">
          {state === "Login" ? "Login" : "Sign Up"}
        </p>

        <p className="text-gray-600">
          {state === "Login"
            ? "Login your business to manage invoices"
            : "Register your business to manage invoices"}
        </p>
      </div>

      {state === "Sign Up" && (
        <div>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Rounak Gupta"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      )}

      <div>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="abc@gmail.com"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded"
      >
        {loading ? "Submitting..." : state === "Login" ? "Login" : "Register"}
      </button>

      <p
        className="text-center"
        onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
      >
        {state === "Login"
          ? "Don't have an account?"
          : "Already have an account?"}
        <span className="text-blue-500 pl-1 underline cursor-pointer">
          {state === "Login" ? "Register" : "Login"}
        </span>
      </p>
    </form>
  );
};

export default Login;
