import express from "express";

const router = express.Router();

let products = [
    { id: 1, name: "Lego Set", price: 50, condition: "used" },
    { id: 2, name: "Barbie Doll" , price: 20, condition:"new" }
];

// GET all products
router.get("/", (req, res)=> {
    res.json(products);
});

// GET product by ID
router.get("/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
});

// POST add new product
router.post("/", (req,res) => {
    const { name, price, condition } = req.body;
    const newProduct = {
        id: products.length +1,
        name,
        price,
        condition
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT update product by ID
router.put("/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const { name, price, condition } = req.body;
    if (name) product.name = name;
    if (price) product.price = price;
    if (condition) product.condition = condition;

    res.json(product);
});

// DELETE product by ID
router.delete("/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const initialLength = products.length;
    products = products.filter(p => p.id !== productId);


    if (products.length === initialLength) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json({message: "Product deleted successfully"});
})

export default router;
