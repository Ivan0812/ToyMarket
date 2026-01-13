import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/toys")
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 4))); // featured
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to Toy Store 🧸
      </h1>

      <h2 className="text-xl font-semibold mb-4">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/products"
          className="inline-block bg-black text-white px-6 py-2 rounded"
        >
          View all products
        </Link>
      </div>
    </div>
  );
};

export default Home;