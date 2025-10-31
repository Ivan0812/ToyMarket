import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";



const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:3000/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
        <button onClick={() => navigate(-1)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded mb-4">
        &larr; Back
        </button>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover rounded-lg shadow mb-6"
      />
      <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
      <p className="text-gray-700 text-lg mb-2">{product.price} €</p>
      <p className="text-gray-600 mb-4">{product.condition}</p>
      <p className="text-gray-500">
        {product.description || "No description available."}
      </p>

        <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        > Add to Cart
        </button>

    </div>
  );
};

export default ProductDetail;