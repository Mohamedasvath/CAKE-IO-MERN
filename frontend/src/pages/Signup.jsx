import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API_URL =import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/api/auth/register`,
        
        formData,
        { headers: { "Content-Type": "application/json" } }
       
        
      );
    
      
      toast.success(res.data.message || "Account created successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Server error, please try again!", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen relative flex items-center justify-center py-12 px-4">
      <ToastContainer />

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1604672857367-a0d662dfd7f2?w=600&auto=format&fit=crop&q=60"
          alt="Cake background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-sm p-8 rounded-3xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          Create an Account
        </h2>
        <p className="text-gray-300 text-center mt-2 mb-6">
          Join us and start ordering your favorite cakes!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-6 py-4 bg-white/5 rounded-full border border-white/10 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            required
            className="w-full px-6 py-4 bg-white/5 rounded-full border border-white/10 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-6 py-4 bg-white/5 rounded-full border border-white/10 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-pink-500"
          />

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
            }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-400 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
