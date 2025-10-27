import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { Cake, Truck, Heart, Star, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

export default function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cake, setCake] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Comments state
  const [reviews, setReviews] = useState([
    { user: "Aarav", rating: 5, comment: "Best chocolate cake ever! 🍫" },
    { user: "Diya", rating: 4, comment: "Super soft & tasty 😍" },
  ]);
  const [newReview, setNewReview] = useState({ user: "", comment: "", rating: 5 });

  // Fetch single cake
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/cakes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCake(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("⚠️ Failed to load cake details!");
      });
  }, [id, API_URL]);

  // Add review
  const handleAddReview = () => {
    if (!newReview.user || !newReview.comment) {
      toast.error("🙅 Fill all fields before posting!");
      return;
    }
    setReviews([...reviews, newReview]);
    setNewReview({ user: "", comment: "", rating: 5 });
    toast.success("✅ Review added successfully!");
  };

  // Confirm order
  const handleConfirm = () => {
    toast.loading("Redirecting to payment...", { id: "order" });
    setTimeout(() => {
      navigate(`/payment/${cake._id}`, { state: { cake } });
      toast.dismiss("order");
    }, 1000);
  };

  // Loading and UI remain same...
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-16 h-16 border-4 border-rose-400 border-t-transparent rounded-full"
        />
        <Typography variant="h6" className="mt-4 text-rose-500 font-semibold">
          Baking your page...
        </Typography>
      </div>
    );
  }

  if (!cake) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-rose-50 text-gray-700">
        <Typography variant="h5">❌ Oops! This cake is not available.</Typography>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 py-12 sm:py-20 px-4">
      {/* --- full UI remains the same --- */}
    </section>
  );
}
