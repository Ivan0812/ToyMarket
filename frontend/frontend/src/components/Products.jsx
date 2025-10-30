import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/products");
            const data = await response.json();
            setProducts(data);    
        } catch (error) {
            console.log('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Products</h2>
      
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
  <Link key={p.id} to={`/products/${p.id}`}>
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
      <img
        src={p.image || 'https://via.placeholder.com/150'}
        alt={p.name}
        className="w-full h-54 object-cover mb-3 rounded"
      />  
      <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
      <p className="text-gray-700 mb-1">{p.price} €</p>
      <p
        className={`font-medium ${
          p.condition === "new" ? "text-green-600" : "text-gray-500"
        }`}
      >
        {p.condition}
      </p>
    </div>
  </Link>
))}
            </div>
          )}
        </div>
      );
};

export default Products;