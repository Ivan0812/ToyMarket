import express from "express";

const router = express.Router();

let products = [
    { id: 1, name: "Lego Bager", price: 8, condition: "used", quantity: 1, image: "/images/IMG_2668.png", description:"Our 4-year-old needed a little help from dad to build it — but no help at all to take it apart!" },
    { id: 2, name: "Cat" , price: 5, condition:"used", quantity: 1, image: "/images/IMG_2672.png", description:"Adorable, soft Cat"  },
    { id: 3, name: "Helicopter" , price: 11, condition:"used", quantity: 1, image: "/images/IMG_2670.png", description:"Flew many missions across the living room!"  },
    { id: 4, name: "Forklift" , price: 3, condition:"used", quantity: 1, image: "/images/IMG_2671.png", description:"Handeecaped"  },
    { id: 5, name: "Board Game" , price: 12, condition:"new", quantity: 2, image: "/images/IMG_2673.png", description:"Brand New."  },
    { id: 6, name: "Masterpeace" , price: 254, condition:"new", quantity: 1, image: "/images/IMG_2681.png", description:"Selfmade masterpeace"  },
    { id: 7, name: "Colored pencils" , price: 3, condition:"new", quantity: 4, image: "/images/IMG_2669-removebg-preview.png", description:"too much on stock"  },
    { id: 8, name: "Lego Fireboat" , price: 11, condition:"used", quantity: 1, image: "/images/IMG_2675.png", description:"necessary evil"  },
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
