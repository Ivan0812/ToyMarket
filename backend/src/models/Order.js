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
    user: { 
         name: { type: String, required: true },
         email: { type: String, required: true },
         address: { type: String, required: true },
         payment: { type: String, default: "cash" },
     },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;