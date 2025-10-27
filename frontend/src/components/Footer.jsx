import React from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const Footer = () => {
  const controls = useAnimation();

  // 🎨 Cycle gradient colors smoothly using Framer Motion
  useEffect(() => {
    controls.start({
      background: [
        "linear-gradient(135deg, #1e1b4b, #312e81, #000)",
        "linear-gradient(135deg, #4c1d95, #701a75, #111)",
        "linear-gradient(135deg, #0f172a, #1e1b4b, #312e81)",
        "linear-gradient(135deg, #111827, #4c1d95, #701a75)",
      ],
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <motion.footer
      animate={controls}
      className="relative overflow-hidden py-14 px-8 md:px-16 rounded-t-3xl text-white"
    >
      {/* ✨ Decorative blurred lights */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-fuchsia-500/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* 🍰 About Section */}
        <div className="space-y-5">
          <motion.h4
            animate={{
              backgroundImage: [
                "linear-gradient(to right, #fb7185, #f472b6, #c084fc)",
                "linear-gradient(to right, #c084fc, #fb7185, #f472b6)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400"
          >
            Cake Shop
          </motion.h4>

          <p className="text-gray-300 leading-relaxed">
            We bake <span className="text-pink-400 font-semibold">happiness</span> into every bite.
            From classic favorites to custom creations, we make your
            celebrations sweeter every day.
          </p>
        </div>

        {/* 🧁 Quick Links */}
        <div className="space-y-5">
          <h4 className="text-xl font-semibold text-pink-300">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
              >
                Our Cakes
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
              >
                Custom Orders
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* 💌 Contact + Social */}
        <div className="space-y-5">
          <h4 className="text-xl font-semibold text-pink-300">
            Stay Connected
          </h4>

          <div className="flex items-center justify-center md:justify-start gap-5">
            <a
              href="#"
              aria-label="Phone"
              className="text-gray-300 hover:text-pink-400 hover:scale-110 transition-all duration-300"
            >
              <Phone size={24} />
            </a>
            <a
              href="mailto:example@email.com"
              aria-label="Mail"
              className="text-gray-300 hover:text-pink-400 hover:scale-110 transition-all duration-300"
            >
              <Mail size={24} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-300 hover:text-pink-400 hover:scale-110 transition-all duration-300"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-300 hover:text-pink-400 hover:scale-110 transition-all duration-300"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-300 hover:text-pink-400 hover:scale-110 transition-all duration-300"
            >
              <Twitter size={24} />
            </a>
          </div>

          <p className="text-gray-500 text-sm mt-10">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-pink-400 font-semibold">Mohamed Asvath</span>.
          </p>
        </div>
      </div>

      {/* 🌈 Subtle gradient line */}
      <motion.div
        animate={{
          background: [
            
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-0 left-0 w-full h-[2px] opacity-70"
      ></motion.div>
    </motion.footer>
  );
};

export default Footer;
