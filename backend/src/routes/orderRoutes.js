import express from 'express';
const router = express.Router();

// 
let orders = [];

// POST create a new order
router.post("/", (req, res) => {
    const {cartItems, totalPrice, user} = req.body;

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }
    const newOrder = {
        id: orders.length + 1,
        cartItems,
        totalPrice,
        user: user || "Guest",
        createdAt: new Date()
    };

    orders.push(newOrder);

    console.log("New order recived:", newOrder);

    res.status(201).json({ message:"Order placed successfully", order: newOrder });
});  

export default router;