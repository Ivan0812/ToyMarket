import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty.</p>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>

      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p>{item.quantity} × {item.price} €</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-lg font-bold text-right">Total: {total.toFixed(2)} €</p>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={clearCart}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Clear Cart
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;