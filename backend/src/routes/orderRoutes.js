import express from "express";
import Order from "../models/Order.js";
import Toy from "../models/Toy.js";
import mongoose from "mongoose";

const router = express.Router();

// POST - kreiranje nove narudžbe i update quantity
router.post("/", async (req, res) => {
  console.log("📩 Received order:", req.body); 
  const { cartItems, totalPrice, user } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    // 1️⃣ Sprema narudžbu u bazu
    const newOrder = new Order({
      cartItems,
      totalPrice,
      user,
    });

    const savedOrder = await newOrder.save();

    for (const item of cartItems) {
      const toy = await Toy.findById(item._id);
    
      if (!toy) {
        return res.status(404).json({
          message: `Toy not found: ${item._id}`,
        });
      }
    
      if (toy.quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${toy.name}`,
        });
      }
    
      toy.quantity -= item.quantity;
    
      if (toy.quantity === 0) {
        toy.inStock = false;
      }
    
      await toy.save();
    }

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ message: "Error placing order" });
  }
});

// GET - dohvat svih narudžbi (ADMIN)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// PUT - update status narudžbe (ostaje isto)
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.status(500).json({ message: "Error updating order status" });
  }
});

// DELETE - briše narudžbu (ostaje isto)
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting order:", error);
    res.status(500).json({ message: "Error deleting order" });
  }
});

export default router;