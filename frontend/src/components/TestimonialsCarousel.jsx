import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    review:
      "The chocolate truffle cake was absolutely divine! So soft, rich, and perfectly sweet. My go-to shop now!",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Amit Verma",
    review:
      "Ordered a birthday cake for my sister — delivered on time and looked exactly like the photo! Highly recommend.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "Priya Nair",
    review:
      "Loved the design, the flavors, and even the packaging. Feels premium and made with care.",
    img: "https://randomuser.me/api/portraits/women/54.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Ravi Kumar",
    review:
      "Their Red Velvet cake was just amazing! Moist and perfectly balanced in flavor. Great service too!",
    img: "https://randomuser.me/api/portraits/men/85.jpg",
    rating: 5,
  },
];

const TestimonialsCarousel = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[index];

  return (
    <div className="bg-black text-white py-24 px-6 md:px-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/10 via-black to-black opacity-70"></div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          Customer Love 💖
        </h2>
        <p className="text-gray-400 mt-3 text-lg">
          What people say about our delicious cakes
        </p>
      </motion.div>

      {/* Carousel Card */}
      <div className="relative z-10 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 max-w-xl text-center shadow-lg relative"
          >
            <motion.img
              src={current.img}
              alt={current.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-pink-400 object-cover shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            <h3 className="text-xl font-semibold text-pink-400 mb-2">
              {current.name}
            </h3>
            <div className="flex justify-center mb-3">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="text-yellow-400 w-5 h-5 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-gray-300 italic leading-relaxed">{current.review}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-8 gap-3 relative z-10">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-pink-400 w-6 shadow-pink-400 shadow-md"
                : "bg-gray-500 hover:bg-pink-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
