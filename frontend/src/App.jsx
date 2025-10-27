import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Loginpage from "./pages/Login";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import SignupPage from "./pages/Signup";
import OrderPage from "./pages/Orderpage";
import PaymentPage from "./pages/paymentPage";
import Cart from "./pages/Cart";
import CakeForm from "./components/CakeForm";
import Productpage from "./pages/Product";
import Dashboard from "./components/Dashboard";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import AdminOrders from "./pages/AdminOrders";

function AppContent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [serverOnline, setServerOnline] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // ✅ Logout helper
  const handleLogout = (message) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.error(message);
    navigate("/login", { replace: true });
  };

  // ✅ Check backend + token status
  const checkServerAndAuth = async () => {
    const token = localStorage.getItem("token");

    // 🟠 If frontend was restarted or reloaded — no token → force login
    if (!token) {
      handleLogout("🔒 Session expired. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      // Ping backend
      const response = await axios.get(`${API_URL}/`, { timeout: 2000 });

      if (response.status === 200) {
        if (!serverOnline) {
          toast.success("✅ Server reconnected!");
          setServerOnline(true);
        }
      }
    } catch (error) {
      // 🔴 Backend DOWN
      if (serverOnline) {
        console.warn("🚨 Server down:", error.message);
        setServerOnline(false);
        handleLogout("⚠️ Server disconnected! You’ve been logged out.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 🟡 Run check immediately when app loads
    checkServerAndAuth();

    // 🕒 Recheck every 10 seconds
    const interval = setInterval(checkServerAndAuth, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-xl font-semibold text-gray-700">
        🔄 Checking server status...
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<Productpage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cake-form" element={<CakeForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/admin-order" element={<AdminOrders />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
