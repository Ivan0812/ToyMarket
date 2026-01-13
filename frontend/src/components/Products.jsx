import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

  const Products = () => {
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(null);
  const { addToCart } = useCart();
  const [addedProduct, setAddedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/toys");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (p) => {
    setLoadingProduct(p._id);

    addToCart({
      _id: p._id,
      name: p.name,
      price: p.price,
      image: p.image,
      quantity: 1,       // stavlja 1 u košaricu
      stock: p.quantity, // stvarni stock iz DB
      category: p.category,
    });

    setAddedProduct(p._id);
    setTimeout(() => {
      setLoadingProduct(null);
      setAddedProduct(null);
    }, 1000);
  };

  if (!products.length) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No products available.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className={`border p-4 rounded shadow relative ${
              p.quantity === 0 ? "opacity-50" : ""
            }`}
          >
            {/* Badge */}
            {p.quantity === 0 && (
              <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                Out of Stock
              </span>
            )}

            <Link to={`/products/${p._id}`}>
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover rounded"
              />
            </Link>

            {/* Precrtavanje naziva/cijene */}
            <h2
              className={`text-lg font-bold mt-2 ${
                p.quantity === 0 ? "line-through text-gray-500" : ""
              }`}
            >
              {p.name}
            </h2>

            <p
              className={`${
                p.quantity === 0 ? "line-through text-gray-500" : ""
              }`}
            >
              {p.price} €
            </p>

            <button
             disabled={
               p.quantity === 0 ||
               loadingProduct === p._id ||
                addedProduct === p._id
               }
              onClick={() => handleAddToCart(p)}
               className={`mt-3 px-4 py-2 rounded text-white transition-all duration-300 ${
                p.quantity === 0
                 ? "bg-gray-400 cursor-not-allowed"
                 : addedProduct === p._id
                ? "bg-green-600 scale-105"
                : "bg-blue-600 hover:bg-blue-700"
             }`}
            >
             {p.quantity === 0
             ? "Sold Out"
             : addedProduct === p._id
             ? "Added ✓"
             : loadingProduct === p._id
             ? "Adding..."
              : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;