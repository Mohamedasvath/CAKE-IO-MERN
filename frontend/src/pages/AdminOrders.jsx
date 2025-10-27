import { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  Truck,
  MapPin,
  CheckCircle,
  Trash2,
  Cake,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [trackingStage, setTrackingStage] = useState(0);
  const [admin, setAdmin] = useState(null);
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Auto check admin login
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAdmin(true);
      toast.success("🎂 Admin Access Granted");
    } else {
      toast.error("❌ Only Admins can access this page");
    }
  }, []);

  // Load saved orders
  useEffect(() => {
    if (admin) {
      const saved = localStorage.getItem("latestOrder");
      if (saved) setOrders([JSON.parse(saved)]);
    }
  }, [admin]);

  // Simulate delivery progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setTrackingStage((prev) => (prev < 3 ? prev + 1 : 3));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: "Order Placed", icon: Package },
    { label: "Shipped", icon: Truck },
    { label: "Out for Delivery", icon: MapPin },
    { label: "Delivered", icon: CheckCircle },
  ];

  const handleDeleteOrder = (orderId) => {
    const updated = orders.filter((o) => o.orderDetails?._id !== orderId);
    setOrders(updated);
    localStorage.removeItem("latestOrder");
    toast.success("Order deleted successfully!");
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseURL = import.meta.env.VITE_API_URL;
    const url =
      formType === "login"
        ? `${baseURL}/api/admin/login`
        : `${baseURL}/api/admin/register`;

    try {
      const res = await axios.post(url, formData);
      if (formType === "signup") {
        toast.success("🎉 Signup successful! Please login.");
        setFormType("login");
        setFormData({ name: "", email: "", password: "" });
      } else {
        localStorage.setItem("adminToken", res.data.token);
        toast.success("Welcome back, Admin 🍰");
        setAdmin(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    toast.success("Logged out successfully!");
  };

  const getTrackingIconClasses = (active) =>
    `w-7 h-7 flex items-center justify-center rounded-full transition-colors duration-300 ${
      active ? "bg-pink-500 text-white" : "bg-gray-600 text-gray-400"
    }`;

  
  // 🎨 LOGIN / SIGNUP UI
 
  if (!admin) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
        style={{
          backgroundImage: "url('/cakes-bg.jpg')",
          backgroundColor: "#2c2f32",
        }}
      >
        <Toaster position="top-center" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-sm text-center text-white"
        >
          <h1
            className="text-4xl font-extrabold mb-2"
            style={{
              background: "linear-gradient(to right, #ec4899, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Admin Login
          </h1>
          <p className="text-gray-200 mb-6 text-sm">
            Access restricted to Cake Admins 🍰
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formType === "signup" && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-full p-3 outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-full p-3 outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-full p-3 outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400"
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 mt-6 rounded-full font-bold text-white shadow-lg transition hover:scale-[0.98]"
              style={{
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
              }}
            >
              {formType === "login" ? "Login" : "Signup"}
            </motion.button>
          </form>

          <p className="mt-5 text-gray-300 text-sm">
            {formType === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setFormType("signup")}
                  className="hover:underline"
                  style={{
                    background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already registered?{" "}
                <button
                  onClick={() => setFormType("login")}
                  className="hover:underline"
                  style={{
                    background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Login
                </button>
              </>
            )}
          </p>
        </motion.div>
      </div>
    );
  }

 
  // 🎂 ADMIN DASHBOARD UI
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-10 text-white">
      <Toaster position="top-center" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-pink-500/40 pb-4 gap-4"
      >
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400 flex items-center gap-2">
          <Cake className="text-pink-400" /> Cake Admin Panel
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-lg shadow-md hover:scale-[0.97] transition"
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition shadow-md"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </motion.div>

      {/* Orders Table */}
      {orders.length === 0 ? (
        <div className="text-center text-gray-400 mt-24">
          <Cake className="mx-auto mb-4 text-pink-400" size={60} />
          <p className="text-lg font-medium">
            No sweet orders found yet 🍪
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800/70 rounded-2xl shadow-xl p-6 overflow-x-auto border border-pink-700/50"
        >
          <table className="w-full text-sm sm:text-base border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-pink-500/20 text-pink-300">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Tracking</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const isDelivered = trackingStage === 3;
                const orderId = order.orderDetails?._id;
                const customerAddress =
                  order.userData?.address || "No Address Provided";

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                  >
                    <td className="p-3 text-gray-400 font-mono text-xs">
                      {orderId?.slice(-8) || "1"}
                    </td>
                    <td className="p-3 flex items-center gap-2 text-gray-200">
                      <User size={16} className="text-pink-500" />
                      {order.userData?.name || "Unknown"}
                    </td>
                    <td className="p-3 text-gray-400 truncate max-w-xs">
                      {customerAddress}
                    </td>
                    <td className="p-3 text-pink-400 font-semibold">
                      ₹{order.total?.toFixed(2) || 0}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                          trackingStage === 3
                            ? "bg-green-700 text-white border border-green-500"
                            : trackingStage > 0
                            ? "bg-yellow-600 text-white border border-yellow-500"
                            : "bg-gray-600 text-white border border-gray-500"
                        }`}
                      >
                        {trackingStage === 3 && (
                          <CheckCircle size={14} className="mr-1" />
                        )}
                        {steps[trackingStage]?.label || "Pending"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        {steps.map((step, i) => {
                          const Icon = step.icon;
                          const active = i <= trackingStage;
                          return (
                            <div
                              key={i}
                              className={getTrackingIconClasses(active)}
                              title={step.label}
                            >
                              <Icon size={16} />
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="p-3">
                      {isDelivered ? (
                        <button
                          onClick={() =>
                            handleDeleteOrder(order.orderDetails?._id)
                          }
                          className="text-red-500 hover:text-red-400 flex items-center gap-1 transition"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      ) : (
                        <span className="text-gray-500 italic">
                          In Progress
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
