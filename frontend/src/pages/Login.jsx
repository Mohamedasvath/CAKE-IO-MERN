import { motion } from "framer-motion";
import { Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const res = await axios.post(`${API_URL}/api/auth/login`,formData);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Toast notification for success
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        theme: "dark",
      });

      // Wait for 3 seconds (toast duration) then redirect
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen relative flex items-center justify-center py-12 px-4">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514517521153-1be72277b32f?q=80&w=687&auto=format&fit=crop"
          alt="Cake background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-sm p-8 rounded-3xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          Welcome Back
        </h2>
        <p className="text-gray-300 text-center mt-2 mb-6">
          Login to your account to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            required
            className="w-full px-6 py-4 bg-white/5 rounded-full border border-white/10 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 outline-none transition"
          />

          {/* Password input with show/hide */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-6 py-4 pr-12 bg-white/5 rounded-full border border-white/10 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 outline-none transition"
            />
            
          </div>

          {/* Login button */}
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            sx={{
              width: "100%",
              background: "linear-gradient(90deg,#ec4899,#a855f7)",
              borderRadius: "50px",
              py: 1.5,
              fontSize: "1.1rem",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(90deg,#d63384,#9333ea)",
              },
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-400 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default LoginPage;
