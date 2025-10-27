import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function Product() {
  const [cakes, setCakes] = useState([]);
  const [cart, setCart] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCake, setSelectedCake] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch(`${API_URL}/api/cakes`)
      .then((res) => res.json())
      .then((data) => setCakes(data))
      .catch((err) => console.error("Error fetching cakes:", err));
  }, [API_URL]);

  const handleShowConfirm = (cake) => {
    setSelectedCake(cake);
    setShowConfirm(true);
  };

  const confirmAddToCart = () => {
    const existingItem = cart.find((item) => item._id === selectedCake._id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === selectedCake._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      toast.success(`${selectedCake.name} quantity updated!`);
    } else {
      updatedCart = [...cart, { ...selectedCake, quantity: 1 }];
      toast.success(`${selectedCake.name} added to cart! 🧁`);
    }

    setCart(updatedCart);
    setShowConfirm(false);
    setSelectedCake(null);
  };

  const handleViewCart = () => navigate("/cart", { state: { cartItems: cart } });
  const totalItemsInCart = cart.reduce((t, i) => t + i.quantity, 0);

  return (
    <section className="relative min-h-screen font-sans bg-gradient-to-b from-[#1a1a1d] via-[#2b1a2e] to-[#1a1a1d] overflow-x-hidden text-white">
      {/* 🍰 Animated Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-[url('/cake-pattern.png')] bg-cover bg-center opacity-10"></div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-10 left-10 text-pink-400/30 text-8xl select-none"
        >
          🎂
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 text-rose-400/30 text-8xl select-none"
        >
          🍰
        </motion.div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-center md:text-left"
          >
            Our <span className="bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">Signature Cakes</span>
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewCart}
            className="relative px-7 py-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full text-white font-semibold flex items-center hover:shadow-pink-500/40 shadow-lg transition-all"
          >
            <ShoppingCart size={20} className="mr-2" />
            View Cart
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {totalItemsInCart}
              </span>
            )}
          </motion.button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {cakes.map((cake, index) => (
            <motion.div
              key={cake._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-3xl border border-pink-500/20 backdrop-blur-xl shadow-lg hover:shadow-pink-500/20 hover:scale-[1.03] transition-all duration-300"
            >
              <motion.img
                src={cake.image}
                alt={cake.name}
                whileHover={{ scale: 1.08, rotate: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-56 object-cover mx-auto rounded-2xl shadow-xl mb-5"
              />

              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  {cake.name}
                </h3>
                <p className="text-gray-300 mt-2 mb-3 text-sm line-clamp-3">
                  {cake.description}
                </p>
                <p className="text-pink-400 font-bold text-lg mb-4">
                  ₹{cake.price}
                </p>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(236, 72, 153, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShowConfirm(cake)}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-md"
                >
                  Add to Cart
                </motion.button>
              </div>

              {/* Subtle cake emoji glow */}
              <motion.span
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-3 right-4 text-4xl opacity-50 select-none"
              >
                🍰
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirm && selectedCake && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900/90 p-8 rounded-3xl shadow-2xl border border-pink-500/30 text-center w-full max-w-md"
          >
            <h3 className="text-3xl font-extrabold mb-3 text-pink-400">
              Confirm Add to Cart
            </h3>
            <p className="text-gray-300 mb-8 text-sm">
              Do you want to add <span className="text-pink-400 font-semibold">{selectedCake.name}</span> to your cart?
            </p>

            <div className="flex justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={confirmAddToCart}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:shadow-pink-500/30 transition"
              >
                Yes, Add
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 transition"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
