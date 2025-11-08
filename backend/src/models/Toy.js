import mongoose from "mongoose";

const toySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String },
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

const Toy = mongoose.model("Toy", toySchema);

export default Toy;