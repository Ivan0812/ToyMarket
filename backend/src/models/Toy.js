import mongoose from "mongoose";

const toySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String },
  quantity: { type: Number, required: true }, // ⬅️ OVO DODANO
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

toySchema.pre("save", function (next) {
  this.inStock = this.quantity > 0;
  next();
});

const Toy = mongoose.model("Toy", toySchema);

export default Toy;