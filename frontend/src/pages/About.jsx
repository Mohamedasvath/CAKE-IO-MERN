import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Heart, Star, Cake, Quote, Hand } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const navigate = useNavigate()

  return (
    <div className="bg-black text-white min-h-screen p-8 md:p-16 flex flex-col items-center">
      {/* Hero Section with Title and Image */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative w-full max-w-6xl rounded-3xl overflow-hidden mb-12"
      >
        <motion.img
          src="https://images.unsplash.com/photo-1746439562964-a56e526b242f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="A baker piping frosting on a chocolate cake"
          className="w-full h-[400px] md:h-[500px] object-cover"
          variants={itemVariants}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-end text-center p-8 md:p-16">
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight"
            variants={itemVariants}
          >
            Our <span className="text-pink-400">Sweet Story</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 max-w-xl mx-auto mt-4"
            variants={itemVariants}
          >
            A decade of passion, a lifetime of sweet creations.
          </motion.p>
        </div>
      </motion.div>

      {/* Our Story Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full my-12"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-3xl font-bold text-pink-400">The Journey of Flavor</h3>
          <p className="text-lg text-gray-300">
            Founded with a simple love for baking, our journey began in a small home kitchen. We believe that every cake tells a story and every celebration deserves a touch of sweetness. From sourcing the finest ingredients to our careful hand-crafting process, we pour our heart into every creation to bring you a truly magical experience.
          </p>
          <p className="text-lg text-gray-300">
            We're more than just a cake shop; we're a part of your happiest moments. Our mission is to spread joy, one delicious slice at a time, ensuring every bite is a memory you'll cherish.
          </p>
        </motion.div>
        <motion.div variants={itemVariants} className="w-full h-full flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1600251822176-c06cdf179619?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0cmF3YmVycnklMjBkcmVhbSUyMGNha2V8ZW58MHx8MHx8fDA%3D"
            alt="A beautifully decorated cake on a stand"
            className="rounded-3xl object-cover w-full"
          />
        </motion.div>
      </motion.div>
      
      {/* Stats Section with a unique design */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center my-12"
      >
        <motion.div variants={itemVariants} className="p-8 bg-white/5 rounded-3xl border border-white/10 shadow-xl">
          <Heart size={48} className="text-pink-400 mx-auto mb-4" />
          <h3 className="text-4xl font-bold text-pink-300">10+</h3>
          <p className="text-gray-400 mt-2">Years of Experience</p>
        </motion.div>
        <motion.div variants={itemVariants} className="p-8 bg-white/5 rounded-3xl border border-white/10 shadow-xl">
          <Star size={48} className="text-purple-400 mx-auto mb-4" />
          <h3 className="text-4xl font-bold text-purple-300">5000+</h3>
          <p className="text-gray-400 mt-2">Happy Customers</p>
        </motion.div>
        <motion.div variants={itemVariants} className="p-8 bg-white/5 rounded-3xl border border-white/10 shadow-xl">
          <Cake size={48} className="text-pink-400 mx-auto mb-4" />
          <h3 className="text-4xl font-bold text-pink-300">10000+</h3>
          <p className="text-gray-400 mt-2">Cakes Baked</p>
        </motion.div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="w-full max-w-6xl text-center my-12"
      >
        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-8">
          What Our <span className="text-pink-400">Customers Say</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="p-8 bg-white/5 rounded-3xl border border-white/10 shadow-xl">
            <Quote size={32} className="text-purple-400 mb-4" />
            <p className="text-lg italic text-gray-300 mb-4">
              "The most beautiful and delicious cake I've ever tasted! It was the centerpiece of our celebration and everyone loved it."
            </p>
            <p className="font-semibold text-pink-300">- JAS</p>
          </motion.div>
          <motion.div variants={itemVariants} className="p-8 bg-white/5 rounded-3xl border border-white/10 shadow-xl">
            <Quote size={32} className="text-purple-400 mb-4" />
            <p className="text-lg italic text-gray-300 mb-4">
              "Incredibly fresh and delivered right on time. This is my go-to place for all my special occasion cakes. Highly recommend!"
            </p>
            <p className="font-semibold text-pink-300">- Me.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Back to Home Button */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="flex justify-center mt-12">
        <Button onClick={()=>navigate('/')}
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #ec4899 0%, #a855f7 100%)",
            borderRadius: "50px",
            px: 4,
            py: 1,
            fontSize: "1rem",
            textTransform: "none",
          }}
        >
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
};

export default AboutPage;
