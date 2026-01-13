import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/toys/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  const isOut = product.quantity === 0;

  return (
    <div className="max-w-4xl mx-auto p-4">

      <div className="relative">
        {isOut && (
          <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded text-sm">
            SOLD OUT
          </span>
        )}
        <div className="w-full h-64 bg-white rounded flex items-center justify-center border">
          <img
           src={product.image}
           alt={product.name}
           className={`max-h-full max-w-full object-contain ${
              isOut ? "opacity-60" : ""
           }`}
           />
        </div>
      </div>

      <h1
        className={`text-2xl font-bold mb-2 ${
          isOut ? "line-through text-gray-500" : ""
        }`}
      >
        {product.name}
      </h1>

      <p className="text-gray-700 mb-2">{product.description}</p>

      <p
        className={`text-lg font-semibold mb-4 ${
          isOut ? "line-through text-gray-500" : ""
        }`}
      >
        {product.price} €
      </p>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4 mb-6">
        <label className="font-semibold">Quantity:</label>

        <select
          value={quantity}
          disabled={isOut}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded p-1 disabled:bg-gray-200"
        >
          {Array.from({ length: product.quantity }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <button
  disabled={isOut || added}
  onClick={() => {
    addToCart({
      ...product,
      _id: product._id,
      quantity,
      stock: product.quantity,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  }}
  className={`px-4 py-2 rounded text-white transition-all duration-300 ${
    isOut
      ? "bg-gray-400 cursor-not-allowed"
      : added
      ? "bg-green-600 scale-105"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {isOut
    ? "Out of Stock"
    : added
    ? "Added ✓"
    : `Add ${quantity} to Cart`}
</button>
    </div>
  );
};

export default ProductDetail;