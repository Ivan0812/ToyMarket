import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
        console.log("Products fetched:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!products.length) {
    return <p className="text-center mt-10 text-gray-500">No products available.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <Link to={`/products/${p.id}`}>
              <img
                src={p.image || "https://via.placeholder.com/150"}
                alt={p.name}
                className="w-full h-56 object-cover mb-3 rounded"
              />
            </Link>
            <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
            <p className="text-gray-700 mb-1">{p.price} €</p>
            <p className={`font-medium ${p.condition === "new" ? "text-green-600" : "text-gray-500"}`}>
              {p.condition}
            </p>
            <button
              onClick={() => addToCart(p)}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;