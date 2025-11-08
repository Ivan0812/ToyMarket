import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// 🔹 POST create a new order
router.post("/", async (req, res) => {
  const { cartItems, totalPrice, user } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    const newOrder = new Order({
      cartItems,
      totalPrice,
      user: user || "Guest",
    });

    const savedOrder = await newOrder.save();
    console.log("✅ New order received:", savedOrder);

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("❌ Error saving order:", error);
    res.status(500).json({ message: "Error placing order" });
  }
});

// 🔹 GET all orders (opcionalno)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

export default router;