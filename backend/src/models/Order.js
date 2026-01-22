import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Toy",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: [String], required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    user: { 
      name: { type: String, required: true },
      email: { type: String, required: true },
      street: { type: String, required: true },
      number: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    
      payment: { type: String, default: "cash" },
    },
    
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;