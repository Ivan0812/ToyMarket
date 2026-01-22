// src/components/ProductCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const isOut = product.quantity === 0;

  const handleAdd = () => {
    setLoading(true);

    addToCart({
      _id: product._id,        // ✅ BITNO
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      stock: product.quantity,
      category: product.category,
    });

    setAdded(true);

    setTimeout(() => {
      setLoading(false);
      setAdded(false);
    }, 1000);
  };

  return (
    <div
      className={`border p-6 rounded shadow relative transition-transform duration-300 hover:scale-105 ${
        isOut ? "opacity-50" : ""
      }`}
    >
      {isOut && (
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          Out of Stock
        </span>
      )}

      <Link to={`/products/${product._id}`}>
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-60 object-contain  rounded"
        />
      </Link>

      <h2 className={`text-lg font-bold mt-2 ${isOut ? "line-through text-gray-500" : ""}`}>
        {product.name}
      </h2>

      <p className={isOut ? "line-through text-gray-500" : ""}>{product.price} €</p>

      <button
        disabled={isOut || loading || added}
        onClick={handleAdd}
        className={`mt-3 px-4 py-2 rounded text-white transition-all duration-300 w-full ${
          isOut
            ? "bg-gray-400 cursor-not-allowed"
            : added
            ? "bg-green-600 scale-105"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isOut
          ? "Sold Out"
          : added
          ? "Added ✓"
          : loading
          ? "Adding..."
          : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;