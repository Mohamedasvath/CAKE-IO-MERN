import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const ContactPage = () => {
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

  return (
    <div className="bg-black text-white min-h-screen relative flex items-center justify-center py-12 px-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1646615077267-97c6088b74d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
          alt="Abstract background of a cake"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Main Content Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-4xl p-8 md:p-12 rounded-3xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl flex flex-col md:flex-row gap-12"
      >
        {/* Contact Information Section */}
        <motion.div variants={itemVariants} className="md:w-1/2 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Let's Talk
          </h2>
          <p className="text-gray-300 text-lg">
            We'd love to hear from you! Whether you have a question about our cakes, a custom order request, or just want to say hi, feel free to reach out.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone size={24} className="text-pink-400" />
              <span className="text-gray-300">+91 9344790389</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={24} className="text-pink-400" />
              <span className="text-gray-300">contact@cakeshop.com</span>
            </div>
          </div>
          <div className="flex space-x-6 pt-4">
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-pink-400 transition-colors duration-200"><Instagram size={28} /></a>
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-pink-400 transition-colors duration-200"><Facebook size={28} /></a>
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-pink-400 transition-colors duration-200"><Twitter size={28} /></a>
          </div>
        </motion.div>
        
        {/* Contact Form Section */}
        <motion.div variants={itemVariants} className="md:w-1/2">
          <form className="space-y-6">
            <motion.input
              type="text"
              placeholder="Your Name"
              className="w-full px-6 py-4 bg-white/5 rounded-full border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              variants={itemVariants}
            />
            <motion.input
              type="email"
              placeholder="Your Email"
              className="w-full px-6 py-4 bg-white/5 rounded-full border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              variants={itemVariants}
            />
            <motion.textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-6 py-4 bg-white/5 rounded-3xl border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 resize-none"
              variants={itemVariants}
            ></motion.textarea>
            <motion.div variants={itemVariants}>
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  background: "linear-gradient(90deg, #ec4899 0%, #a855f7 100%)",
                  borderRadius: "50px",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  textTransform: "none",
                }}
              >
                Send Message
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
