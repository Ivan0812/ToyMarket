import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String },
      },
    ],
    totalPrice: { type: Number, required: true },
    user: { type: String, default: "Guest" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;