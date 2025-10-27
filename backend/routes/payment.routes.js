import express from "express";
import { createOrder } from "../controllers/order.controller.js";
import { initiatePaytmPayment, paytmCallback } from "../controllers/payment.controller.js";


const router = express.Router();

// 🟢 COD / Normal DB Order
router.post("/order", createOrder);

// 🟢 Paytm initiate
router.post("/paytm/initiate", initiatePaytmPayment);

// 🟢 Paytm callback
router.post("/paytm/callback", paytmCallback);



export default router;
