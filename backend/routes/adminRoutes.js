import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
import { verifyAdminToken } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Example protected route
router.get("/dashboard", verifyAdminToken, (req, res) => {
  res.json({ message: "Welcome Admin!", admin: req.admin });
});

export default router;
