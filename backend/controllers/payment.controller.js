import PaytmChecksum from "paytmchecksum";
import https from "https";
import Order from "../models/order.js";  // ✅ order model import

// ✅ Step 1: Initiate payment
export const initiatePaytmPayment = async (req, res) => {
  try {
    const { amount, customerId, orderId } = req.body;

    const paytmParams = {
      MID: process.env.PAYTM_MID,
      WEBSITE: process.env.PAYTM_WEBSITE,
      CHANNEL_ID: "WEB",
      INDUSTRY_TYPE_ID: "Retail",
      ORDER_ID: orderId, // frontend la generate panna orderId pass pannunga
      CUST_ID: customerId,
      TXN_AMOUNT: String(amount),
      CALLBACK_URL: "http://localhost:5000/api/payments/paytm/callback",
    };

    const checksum = await PaytmChecksum.generateSignature(
      paytmParams,
      process.env.PAYTM_KEY
    );
    paytmParams.CHECKSUMHASH = checksum;

    // ✅ send params back to frontend → frontend form submit panna Paytm ku
    res.json(paytmParams);
  } catch (err) {
    res.status(500).json({ message: "Payment init failed", error: err.message });
  }
};

// ✅ Step 2: Handle Paytm Callback
export const paytmCallback = async (req, res) => {
  try {
    const { ORDERID, STATUS, CHECKSUMHASH } = req.body;

    // 🔐 Verify checksum
    const isValidChecksum = PaytmChecksum.verifySignature(
      req.body,
      process.env.PAYTM_KEY,
      CHECKSUMHASH
    );

    if (!isValidChecksum) {
      return res.status(400).send("Checksum mismatch ❌");
    }

    // ✅ Update order in DB
    if (STATUS === "TXN_SUCCESS") {
      await Order.findOneAndUpdate(
        { _id: ORDERID },
        { paymentStatus: "success" },
        { new: true }
      );
      return res.send("✅ Payment successful & order updated");
    } else {
      await Order.findOneAndUpdate(
        { _id: ORDERID },
        { paymentStatus: "failed" }
      );
      return res.send("❌ Payment failed");
    }
  } catch (err) {
    res.status(500).json({ message: "Callback error", error: err.message });
  }
};
