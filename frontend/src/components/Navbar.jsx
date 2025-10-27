import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  X,
  Home,
  Info,
  Phone,
  PackageSearch,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import logo from "../assets/logo.png"; // ✅ your logo file (put in src/assets)

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shrink, setShrink] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  // ✅ Detect login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    alert("Logged out!");
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setShrink(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/", icon: <Home size={20} /> },
    { label: "Products", path: "/products", icon: <PackageSearch size={20} /> },
    { label: "About", path: "/about", icon: <Info size={20} /> },
    { label: "Contact", path: "/contact", icon: <Phone size={20} /> },
    { label: "Admin", path: "/admin-order", icon: <PackageSearch size={20} /> },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "black",
          backdropFilter: "blur(12px)",
          transition: "all 0.3s ease",
          height: shrink ? "60px" : "80px",
          display: "flex",
          justifyContent: "center",
          boxShadow: "0 4px 30px rgba(0,0,0,0.6)",
        }}
      >
        <Toolbar className="flex justify-between">
          {/* ✅ Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center gap-2 no-underline">
              <img
                src={logo}
                alt="DarkCake Logo"
                className="w-10 h-10 rounded-full object-cover shadow-md"
              />
              <Typography
                variant="h6"
                sx={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  letterSpacing: 1,
                 
                }}
              >
               Cake Shop
              </Typography>
            </Link>
          </motion.div>

          {/* Desktop Links */}
          {!isMobile && (
            <div className="flex gap-6">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <Button
                    key={i}
                    component={Link}
                    to={link.path}
                    startIcon={link.icon}
                    sx={{
                      color: "white",
                      position: "relative",
                      fontWeight: 500,
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: isActive ? "100%" : "0%",
                        height: "2px",
                        bottom: 0,
                        left: 0,
                        backgroundColor: "#00f5d4",
                        transition: "width 0.3s",
                        boxShadow: isActive ? "0 0 8px #00f5d4" : "none",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}
            </div>
          )}

          {/* Auth Buttons */}
          {!isMobile && (
            <div className="flex ml-7">
              {!isLoggedIn ? (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    startIcon={<LogIn size={18} />}
                    sx={{ color: "white" }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    startIcon={<UserPlus size={18} />}
                    sx={{ color: "white" }}
                  >
                    Signup
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleLogout}
                  startIcon={<LogOut size={18} />}
                  sx={{ color: "white" }}
                >
                  Logout
                </Button>
              )}
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <IconButton
              component={Link}
              to="/cart"
              sx={{
                backgroundColor: "white",
                color: "#0f172a",
                p: 1.5,
                borderRadius: "50%",
                "&:hover": {
                  transform: "scale(1.1)",
                  backgroundColor: "#00f5d4",
                  color: "black",
                },
              }}
            >
              <ShoppingBag size={22} />
            </IconButton>

            {/* Mobile Hamburger */}
            {isMobile && (
              <IconButton sx={{ color: "white" }} onClick={toggleDrawer(true)}>
                <Menu size={28} />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "70%",
            background: "rgba(10, 10, 10, 0.95)",
            backdropFilter: "blur(15px)",
            color: "white",
          },
        }}
      >
        <div className="flex justify-end p-4">
          <IconButton sx={{ color: "white" }} onClick={toggleDrawer(false)}>
            <X size={28} />
          </IconButton>
        </div>
        <List>
          {navLinks.map((link, i) => (
            <ListItem
              button
              key={i}
              component={Link}
              to={link.path}
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon sx={{ color: "white" }}>{link.icon}</ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItem>
          ))}
          {!isLoggedIn ? (
            <>
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <LogIn size={20} />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/signup"
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <UserPlus size={20} />
                </ListItemIcon>
                <ListItemText primary="Signup" />
              </ListItem>
            </>
          ) : (
            <ListItem button onClick={handleLogout}>
              <ListItemIcon sx={{ color: "white" }}>
                <LogOut size={20} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}
