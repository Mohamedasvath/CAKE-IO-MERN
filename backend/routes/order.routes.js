import express from "express";
import { createOrder, getAllOrders } from "../controllers/order.controller.js";

const router = express.Router();

// ✅ POST → Create new order
router.post("/", createOrder);

// ✅ GET → Get all orders (admin panel)
router.get("/", getAllOrders);

export default router;
