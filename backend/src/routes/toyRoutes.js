import express from "express";
import Toy from "../models/Toy.js";

const router = express.Router();

const defaultProducts = [
  { name: "Lego Bager", price: 8, category: "used", image: "/images/IMG_2668.png", description: "Our 4-year-old needed a little help from dad to build it — but no help at all to take it apart!" },
  { name: "Cat", price: 5, category: "used", image: "/images/IMG_2672.png", description: "Adorable, soft Cat" },
  { name: "Helicopter", price: 11, category: "used", image: "/images/IMG_2670.png", description: "Flew many missions across the living room!" },
  { name: "Forklift", price: 3, category: "used", image: "/images/IMG_2671.png", description: "Handeecaped" },
  { name: "Board Game", price: 12, category: "new", image: "/images/IMG_2673.png", description: "Brand New." },
  { name: "Masterpeace", price: 254, category: "new", image: "/images/IMG_2681.png", description: "Selfmade masterpeace" },
  { name: "Colored pencils", price: 3, category: "new", image: "/images/IMG_2669-removebg-preview.png", description: "too much on stock" },
  { name: "Lego Fireboat", price: 11, category: "used", image: "/images/IMG_2675.png", description: "necessary evil" },
];

// 🔹 GET all toys
router.get("/", async (req, res) => {
  try {
    let toys = await Toy.find();

    // ako je prazno, dodaj početne proizvode
    if (toys.length === 0) {
      await Toy.insertMany(defaultProducts);
      toys = await Toy.find();
      console.log("✅ Default proizvodi su dodani u MongoDB");
    }

    res.json(toys);
  } catch (error) {
    console.error("❌ Error fetching toys:", error);
    res.status(500).json({ message: "Error fetching toys" });
  }
});

// 🔹 GET pojedinačni proizvod
router.get("/:id", async (req, res) => {
  try {
    const toy = await Toy.findById(req.params.id);
    if (!toy) return res.status(404).json({ message: "Toy not found" });
    res.json(toy);
  } catch (error) {
    res.status(500).json({ message: "Error fetching toy" });
  }
});

export default router;