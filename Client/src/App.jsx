import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import ForgotPassword from "./utils/ForgotPassword";
import ResetPassword from "./utils/ResetPassword";
import Navbar from "./utils/Navbar";
import { motion } from "framer-motion";
import { AiOutlineGoogle } from "react-icons/ai";

// const API_URL = "https://auth-v1-4.onrender.com";
// const API_URL = "https://auth-v1-lahf.onrender.com";
const API_URL = "https://auth-2-sju6.onrender.com";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const Login = ({ setUser }) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
  
      if (name === "email") {
        setEmailError(emailRegex.test(value) ? "" : "Invalid email format");
      }
  
      if (name === "password") {
        setPasswordError(
          passwordRegex.test(value)
            ? ""
            : "Password must be at least 8 characters, include uppercase, lowercase, digit, and special character"
        );
      }
    };
  
    const login = async (e) => {
      e.preventDefault();
      setEmailError("");
      setPasswordError("");
  
      if (!emailRegex.test(form.email)) {
        toast.error("⚠️ Invalid email format");
        return;
      }
      if (!passwordRegex.test(form.password)) {
        toast.error("⚠️ Password must be strong");
        return;
      }
  
      try {
        const res = await axios.post(`${API_URL}/login`, form, {
          withCredentials: true,
        });
  
        setUser(res.data?.user);
        toast.success("🎉 Login successful! Welcome back!", { autoClose: 3000 });
  
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } catch (err) {
        toast.error("⚠️ Login failed! " + (err.response?.data?.message || ""), {
          autoClose: 3000,
        });
      }
    };
  
    const googleLogin = () => {
      window.location.href = `${API_URL}/auth/google`;
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#fff0f5] via-[#f0f8ff] to-[#f5f5f5] p-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl bg-white shadow-lg p-6 rounded-lg h-[400px]"
        >
          <h2 className="text-lg font-bold mb-4 text-black-600">Login</h2>
          <form onSubmit={login} className="space-y-3">
            <input
              className="w-full p-2 border rounded border-blue-300 focus:ring focus:ring-blue-200"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
  
            <input
              className="w-full p-2 border rounded border-blue-300 focus:ring focus:ring-blue-200"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
  
            <button
              className="w-full bg-[#002b5a] text-white p-2 rounded hover:bg-[#5548d4]"
              type="submit"
            >
              Login
            </button>
          </form>
  
          <button
            onClick={googleLogin}
            className="w-full mt-3 bg-[#002b5a] text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-[#5548d4] shadow-md"
          >
            <AiOutlineGoogle className="h-5 w-5" />
            Login with Google
          </button>
  
          <div className="mt-4 text-center">
            <p>
              <Link to="/forgot-password" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </p>
          </div>
  
          <div className="mt-4 text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>
  
        <ToastContainer />
      </div>
    );
  };


  const Signup = ({ setUser }) => {
    const [form, setForm] = useState({ userName: "", email: "", password: "" });
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
  
      if (name === "password") {
        setPasswordError(
          passwordRegex.test(value)
            ? ""
            : "Password must be at least 8 characters, include uppercase, lowercase, digit, and special character"
        );
      }
    };
  
    const register = async (e) => {
      e.preventDefault();
  
      if (!passwordRegex.test(form.password)) {
        toast.error("⚠️ Password does not meet security requirements!");
        return;
      }
  
      try {
        const res = await axios.post(`${API_URL}/signup`, form);
        setUser(res.data?.user);
  
        toast.success("🎉 Sign-up successful! Welcome!");
  
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } catch (err) {
        toast.error(`❌ ${err.response?.data?.msg || "An error occurred"}`);
      }
    };
  
    const googleSignup = () => {
      toast.info("🔄 Redirecting to Google Sign-Up...");
      window.location.href = `${API_URL}/auth/google`;
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#fff0f5] via-[#f0f8ff] to-[#f5f5f5] p-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg bg-white shadow-lg p-6 rounded-lg h-[400px]"
        >
          <h2 className="text-xl font-bold mb-4 text-black-600 ">Sign Up</h2>
          <form onSubmit={register} className="space-y-3">
            <input
              className="w-full p-2 border rounded border-blue-300 focus:ring focus:ring-blue-200"
              type="text"
              name="userName"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              className="w-full p-2 border rounded border-blue-300 focus:ring focus:ring-blue-200"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              className="w-full p-2 border rounded border-blue-300 focus:ring focus:ring-blue-200"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <button
              className="w-full bg-[#002b5a] text-white p-2 rounded hover:bg-[#5548d4]"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <button
            onClick={googleSignup}
            className="w-full mt-3 bg-[#002b5a] text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-[#5548d4] shadow-md"
          >
            <AiOutlineGoogle className="h-5 w-5" />
            Sign Up with Google
          </button>
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
        <ToastContainer />
      </div>
    );
  };
  

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/user`, { withCredentials: true })
      .then((response) => setUser(response.data));
  }, []);

  const logout = async () => {
    await axios.get(`${API_URL}/logout`, { withCredentials: true });
    setUser(null);
  };

  return (
    <Router>
      <Navbar />
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <Routes>
        <Route path="/" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
