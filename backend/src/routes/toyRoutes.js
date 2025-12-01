import express from "express";
import Toy from "../models/Toy.js";

const router = express.Router();

const defaultProducts = [
  { name: "Lego Bager", price: 8, quantity: 1, category: "used", image: "/images/IMG_2668.png", description: "Our 4-year-old needed a little help from dad to build it — but no help at all to take it apart!" },
  { name: "Cat", price: 5, quantity: 1, category: "used", image: "/images/IMG_2672.png", description: "Adorable, soft Cat" },
  { name: "Helicopter", price: 11, quantity: 1, category: "used", image: "/images/IMG_2670.png", description: "Flew many missions across the living room!" },
  { name: "Forklift", price: 3, quantity: 1, category: "used", image: "/images/IMG_2671.png", description: "Handeecaped" },
  { name: "Board Game", price: 12, quantity: 2, category: "new", image: "/images/IMG_2673.png", description: "Brand New." },
  { name: "Masterpeace", price: 254, quantity: 1, category: "new", image: "/images/IMG_2681.png", description: "Selfmade masterpeace" },
  { name: "Colored pencils", price: 3, quantity: 5, category: "new", image: "/images/IMG_2669-removebg-preview.png", description: "too much on stock" },
  { name: "Lego Fireboat", price: 11, quantity: 1, category: "used", image: "/images/IMG_2675.png", description: "necessary evil" },
];

// GET ALL TOYS
router.get("/", async (req, res) => {
  try {
    let toys = await Toy.find();

    if (toys.length === 0) {
      await Toy.insertMany(defaultProducts);
      toys = await Toy.find();
      console.log("Default proizvodi dodani.");
    }

    res.json(toys);
  } catch (error) {
    res.status(500).json({ message: "Error fetching toys" });
  }
});

// GET SINGLE TOY
router.get("/:id", async (req, res) => {
  try {
    const toy = await Toy.findById(req.params.id);
    if (!toy) return res.status(404).json({ message: "Toy not found" });
    res.json(toy);
  } catch (error) {
    res.status(500).json({ message: "Error fetching toy" });
  }
});

// UPDATE TOY (ADMIN, UPDATE QUANTITY)
router.patch("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;

    const toy = await Toy.findById(req.params.id);
    if (!toy) return res.status(404).json({ message: "Toy not found" });

    // update quantity
    if (quantity !== undefined) {
      toy.quantity = quantity;
      toy.inStock = quantity > 0; // auto update inStock
    }

    const updatedToy = await toy.save();
    res.json(updatedToy);

  } catch (error) {
    console.error("Error updating toy:", error);
    res.status(500).json({ message: "Error updating toy" });
  }
});

// RESET PRODUCTS
router.delete("/reset", async (req, res) => {
  try {
    await Toy.deleteMany({});
    await Toy.insertMany(defaultProducts);
    res.json({ message: "Products reset." });
  } catch (e) {
    res.status(500).json({ message: "Reset failed." });
  }
});

export default router;