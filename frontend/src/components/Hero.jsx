// import { motion } from "framer-motion";
// import { Button } from "@mui/material";
// import { ArrowRight, Cake, Heart, Truck, Gift, Star, ChefHat, Instagram, Facebook, Twitter, Phone, Mail } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   // Data for the featured cakes section. Images have been updated to match the cake names.
//   const featuredCakes = [
//     {
//       name: "Chocolate Delight",
//       description: "Rich, decadent chocolate cake with a creamy ganache frosting. A true classic.",
//       icon: <Cake size={60} className="text-pink-400 drop-shadow-lg" />,
//       image: "https://images.unsplash.com/photo-1627385006598-6b7f89f20876?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hvY3VsYXRlJTIwZGVsaWdodCUyMGNha2V8ZW58MHx8MHx8fDA%3D"
//     },
//     {
//       name: "Vanilla Heaven",
//       description: "Fluffy vanilla bean cake with a smooth, buttery frosting and fresh toppings.",
//       icon: <Star size={60} className="text-pink-400 drop-shadow-lg" />,
//       image: "https://plus.unsplash.com/premium_photo-1741194732561-18644fca7d90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVuaWxsYSUyMGhlYXZlbiUyMGNha2V8ZW58MHx8MHx8fDA%3D"
//     },
//     {
//       name: "Red Velvet",
//       description: "Moist and velvety red velvet cake with a tangy cream cheese frosting.",
//       icon: <Heart size={60} className="text-pink-400 drop-shadow-lg" />,
//       image: "https://images.unsplash.com/photo-1714386148315-2f0e3eebcd5a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVkJTIwdmVsdmV0JTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D"
//     },
//   ];
//   const navigate = useNavigate()

//   // Data for the "Why Choose Us" section.
//   const whyChooseUs = [
//     {
//       title: "Handcrafted",
//       description: "Every cake is handcrafted with passion and care to ensure perfect taste.",
//       icon: <ChefHat size={40} className="text-pink-400" />,
//     },
//     {
//       title: "Fresh & Tasty",
//       description: "We bake daily using only the finest ingredients, delivered fresh to you.",
//       icon: <Cake size={40} className="text-pink-400" />,
//     },
//     {
//       title: "Fast Delivery",
//       description: "Get your delicious cake delivered quickly and securely to your doorstep.",
//       icon: <Truck size={40} className="text-pink-400" />,
//     },
//     {
//       title: "Custom Orders",
//       description: "We can create a unique cake for any special occasion, just for you.",
//       icon: <Gift size={40} className="text-pink-400" />,
//     },
//   ];

//   return (
//     <div className="bg-black text-white w-full overflow-hidden">
//       {/* HERO SECTION - This section contains the main headline and call to action */}
//       <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
//         {/* Background Image with Overlay */}
//         <div className="absolute inset-0 z-0">
//           <img
//             src="https://plus.unsplash.com/premium_photo-1663133730195-2ce4986a96b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI4fHxjYWtlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
//             alt="Delicious chocolate cake"
//             className="w-full h-full object-cover opacity-30"
//           />
//           {/* A dark overlay to ensure text is visible */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
//         </div>

//         {/* Hero Content - Centered content with animations */}
//         <div className="relative z-10 text-center max-w-2xl px-8">
//           <motion.h1
//             initial={{ y: -40, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl md:text-6xl font-bold leading-tight"
//           >
//             Delicious Cakes{" "}
//             <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
//               Made Just for You
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 1 }}
//             className="text-lg text-gray-300 max-w-lg mx-auto mt-4"
//           >
//            Choose from a wide variety of birthday cake flavors such as Chocolate Cakes, Fruit Cakes, Butterscotch Cakes or Heart Shaped Cakes for someone special :)
//           </motion.p>

//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.6 }}
//             className="mt-8"
//           >
//             <Button 
//             onClick={()=>navigate('/products')}
//               variant="contained"
//               endIcon={<ArrowRight />}
//               sx={{
//                 background: "linear-gradient(90deg, #ec4899 0%, #a855f7 100%)",
//                 borderRadius: "50px",
//                 px: 4,
//                 py: 1.5,
//                 fontSize: "1rem",
//                 textTransform: "none",
//               }}
//             >
//               Order Now
//             </Button>
//           </motion.div>
//         </div>
//       </section>

//       {/* FEATURED CAKES - Unique card design with new images */}
//       <section className="py-0 px-8 md:px-16 mb-10">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-3xl md:text-5xl font-bold mb-12 text-center"
//         >
//           Our <span className="text-pink-400">Featured Cakes</span>
//         </motion.h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {featuredCakes.map((cake, i) => (
//             <motion.div
//               key={i}
//               className="relative group bg-white/5 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-105"
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: i * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <div className="relative h-72 w-full overflow-hidden">
//                 <img
//                   src={cake.image}
//                   alt={cake.name}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 group-hover:opacity-100"></div>
//               </div>
              
//               <div className="absolute bottom-0 p-6 w-full text-center z-10">
//                 <h3 className="text-3xl font-bold text-white mb-2">{cake.name}</h3>
//                 <p className="text-gray-300 text-sm mb-4">{cake.description}</p>
//                 <Button
                
//                   variant="contained"
//                   endIcon={<ArrowRight />}
//                   sx={{
//                     background: "linear-gradient(90deg, #ec4899 0%, #a855f7 100%)",
//                     borderRadius: "50px",
//                     px: 3,
//                     py: 1,
//                     fontSize: "0.9rem",
//                     textTransform: "none",
//                   }}
//                 >
//                   Order Now
//                 </Button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* WHY CHOOSE US - New design with animated icons */}
//       <section className="py-20 px-8 md:px-16 bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-3xl md:text-5xl font-bold mb-12"
//         >
//           Why <span className="text-pink-400">Choose Us?</span>
//         </motion.h2>

//         {/* Grid layout for feature cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {whyChooseUs.map((feature, i) => (
//             <motion.div
//               key={i}
//               className="group relative bg-white/5 rounded-3xl p-8 border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
//               whileHover={{ y: -5 }}
//               initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: i * 0.2 }}
//               viewport={{ once: true }}
//             >
//               <div className="relative z-10 flex flex-col items-center gap-4">
//                 {feature.icon}
//                 <h3 className="text-xl font-semibold">{feature.title}</h3>
//                 <p className="text-gray-300 text-sm">{feature.description}</p>
//               </div>
//               <div
//                 className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//               ></div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

      
    
//     </div>
//   );
// }





import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@mui/material";
import { ArrowRight, Cake, Heart, Truck, Gift, Star, ChefHat, Instagram, Facebook, Twitter, Phone, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestimonialsCarousel from "./TestimonialsCarousel";

export default function Home() {
  // --- 3D SLIDER LOGIC & DATA ---
  const sliderImages = [
    // Image 1: Birthday Cake
    "https://media.istockphoto.com/id/1247903562/photo/slice-of-a-birthday-cake-on-plate.webp?a=1&b=1&s=612x612&w=0&k=20&c=guipBVrfDFpCdRy5gc0NcDZwl_uEX-NBiNhMGsXCoBQ=",
    // Image 2: Custom Cakes
    "https://images.unsplash.com/photo-1577998474517-7eeeed4e448a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    // Image 3: Layered Dessert
    "https://images.unsplash.com/photo-1568827999250-3f6afff96e66?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",

    "https://plus.unsplash.com/premium_photo-1688385990051-adfb24763214?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGNha2UlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate the slider every 5 seconds (5000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);
  // ---------------------------------

  // Data for the featured cakes section. Images have been updated to match the cake names.
  const featuredCakes = [
    {
      name: "Chocolate Delight",
      description: "Rich, decadent chocolate cake with a creamy ganache frosting. A true classic.",
      icon: <Cake size={60} className="text-pink-400 drop-shadow-lg" />,
      image: "https://images.unsplash.com/photo-1627385006598-6b7f89f20876?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hvY3VsYXRlJTIwZGVsaWdodCUyMGNha2V8ZW58MHx8MHx8fDA%3D"
    },
    {
      name: "Vanilla Heaven",
      description: "Fluffy vanilla bean cake with a smooth, buttery frosting and fresh toppings.",
      icon: <Star size={60} className="text-pink-400 drop-shadow-lg" />,
      image: "https://plus.unsplash.com/premium_photo-1741194732561-18644fca7d90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVuaWxsYSUyMGhlYXZlbiUyMGNha2V8ZW58MHx8MHx8fDA%3D"
    },
    {
      name: "Red Velvet",
      description: "Moist and velvety red velvet cake with a tangy cream cheese frosting.",
      icon: <Heart size={60} className="text-pink-400 drop-shadow-lg" />,
      image: "https://images.unsplash.com/photo-1714386148315-2f0e3eebcd5a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVkJTIwdmVsdmV0JTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D"
    },
  ];
  const navigate = useNavigate()

  // Data for the "Why Choose Us" section.
  const whyChooseUs = [
    {
      title: "Handcrafted",
      description: "Every cake is handcrafted with passion and care to ensure perfect taste.",
      icon: <ChefHat size={40} className="text-pink-400" />,
    },
    {
      title: "Fresh & Tasty",
      description: "We bake daily using only the finest ingredients, delivered fresh to you.",
      icon: <Cake size={40} className="text-pink-400" />,
    },
    {
      title: "Fast Delivery",
      description: "Get your delicious cake delivered quickly and securely to your doorstep.",
      icon: <Truck size={40} className="text-pink-400" />,
    },
    {
      title: "Custom Orders",
      description: "We can create a unique cake for any special occasion, just for you.",
      icon: <Gift size={40} className="text-pink-400" />,
    },
  ];

  return (
    <div className="bg-black text-white w-full overflow-hidden">
      {/* HERO SECTION - This section contains the main headline and call to action */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Image Slider with 3D Effect Simulation */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            // Start slightly scaled up and rotated for 3D depth and movement
            initial={{ opacity: 0, scale: 1.1, rotateY: 5 }} 
            // Animate to full visibility, scale, and zero rotation
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            // Exit to the opposite side to give a smooth, continuous slide feel
            exit={{ opacity: 0, scale: 1.1, rotateY: -5 }} 
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={sliderImages[currentSlide]}
              alt={`Cake slide ${currentSlide + 1}`}
              className="w-full h-full object-cover opacity-30"
              // Fallback for image loading error
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/800x600/1f2937/ffffff?text=Cake+Placeholder';
              }}
            />
            {/* A dark overlay to ensure text is visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
          </motion.div>
        </AnimatePresence>

        {/* Hero Content - Centered content with animations */}
        <div className="relative z-10 text-center max-w-2xl px-8">
          <motion.h1
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Delicious Cakes{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              Made Just for You
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-lg text-gray-300 max-w-lg mx-auto mt-4"
          >
            Choose from a wide variety of birthday cake flavors such as Chocolate Cakes, Fruit Cakes, Butterscotch Cakes or Heart Shaped Cakes for someone special :)
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <Button 
            onClick={()=>navigate('/products')}
              variant="contained"
              endIcon={<ArrowRight />}
              sx={{
                background: "linear-gradient(90deg, #ec4899 0%, #a855f7 100%)",
                borderRadius: "50px",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                textTransform: "none",
              }}
            >
              Order Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FEATURED CAKES - Unique card design with new images */}
      <section className="py-20 px-8 md:px-16 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-12 text-center"
        >
          Our <span className="text-pink-400">Featured Cakes</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredCakes.map((cake, i) => (
            <motion.div
              key={i}
              className="relative group bg-white/5 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={()=>navigate('/products')} // Added navigation
            >
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
              
              <div className="absolute bottom-0 p-6 w-full text-center z-10">
                <h3 className="text-3xl font-bold text-white mb-2">{cake.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{cake.description}</p>
                <Button
                  variant="contained"
                  endIcon={<ArrowRight />}
                  sx={{
                    background: "linear-gradient(90deg, #ec4899 0%, #a855f7 100%)",
                    borderRadius: "50px",
                    px: 3,
                    py: 1,
                    fontSize: "0.9rem",
                    textTransform: "none",
                  }}
                >
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US - New design with animated icons */}
      <section className="py-20 px-8 md:px-16 bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-12"
        >
          Why <span className="text-pink-400">Choose Us?</span>
        </motion.h2>

        {/* Grid layout for feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {whyChooseUs.map((feature, i) => (
            <motion.div
              key={i}
              className="group relative bg-white/5 rounded-3xl p-8 border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10 flex flex-col items-center gap-4">
                {feature.icon}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </motion.div>
          ))}
        </div>
      </section>
      <TestimonialsCarousel/>

       {/* CONTACT/FOOTER SECTION */}
       {/* <footer className="bg-gray-900 py-12 px-8 md:px-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-left">
          
       
          <div>
            <h3 className="text-2xl font-extrabold text-pink-400 mb-4">Sweet Delights</h3>
            <p className="text-gray-400 text-sm">
              Baking happiness, one slice at a time. We use the finest ingredients for every celebration.
            </p>
          </div>

        
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-pink-400 transition cursor-pointer">Products</li>
              <li className="hover:text-pink-400 transition cursor-pointer">Custom Orders</li>
              <li className="hover:text-pink-400 transition cursor-pointer">About Us</li>
              <li className="hover:text-pink-400 transition cursor-pointer">FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Get in Touch</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-pink-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-pink-400" />
                <span>hello@sweetdelights.com</span>
              </li>
              <li className="flex items-center space-x-2">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                <span>Chennai, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>

       
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <motion.a href="#" whileHover={{ scale: 1.2, color: '#ec4899' }} className="text-gray-400">
                <Instagram size={24} />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2, color: '#ec4899' }} className="text-gray-400">
                <Facebook size={24} />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2, color: '#ec4899' }} className="text-gray-400">
                <Twitter size={24} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Sweet Delights. All rights reserved.
        </div>
      </footer> */}
    </div>
  );
}

