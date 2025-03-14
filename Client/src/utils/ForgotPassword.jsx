import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  // const API_URL = "https://auth-v1-4.onrender.com";
  // const API_URL = "https://auth-v1-lahf.onrender.com";
  const API_URL = "https://auth-2-sju6.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/forgot-password`, { email }, { withCredentials: true });

      Cookies.set("resetEmail", email, {
        expires: 0.01, // 15 minutes (0.01 days = ~15 mins)
        sameSite: "Strict",
      });

      toast.success(res.data.msg || "OTP sent successfully!");
  
      setTimeout(() => {
        navigate("/reset-password"); // Navigate after delay
      }, 3000);
  
    } catch (err) {
      toast.error(err.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#fff0f5] via-[#f0f8ff] to-[#f5f5f5] p-6">
      <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-black-600">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-2 border rounded border-blue-300 focus:ring focus:ring-blue-200"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full bg-[#002b5a] text-white p-2 rounded hover:bg-[#002b5a]">
            Send OTP
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;

