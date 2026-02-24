import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => navigate("/checkout");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>

      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center 
             bg-white shadow-sm rounded-xl 
             p-4 mb-4 transition hover:shadow-md">
            <div className="flex items-center gap-4">
  <div>
    <p className="font-semibold text-lg">{item.name}</p>

    <p className="text-gray-500 text-sm">
      {item.price} € each
    </p>

    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={() =>
          updateQuantity(item.id, Math.max(1, item.quantity - 1), item.stock)
        }
        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        -
      </button>

      <span className="font-medium">{item.quantity}</span>

      <button
        onClick={() =>
          updateQuantity(item.id, item.quantity + 1, item.stock)
        }
        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        +
      </button>
    </div>
  </div>
</div>

<div className="text-right">
  <p className="font-bold text-lg">
    {(item.price * item.quantity).toFixed(2)} €
  </p>

  <button
    onClick={() => removeFromCart(item.id)}
    className="text-red-500 text-sm hover:underline mt-2"
  >
    Remove
  </button>
</div>
          </li>

        ))}

      </ul>

      <div className="bg-white shadow-md rounded-xl p-6 mt-6">
  <div className="flex justify-between text-lg font-semibold">
    <span>Total</span>
    <span>{total.toFixed(2)} €</span>
  </div>

  <div className="flex gap-4 mt-6">
    <button
      onClick={clearCart}
      className="flex-1 bg-gray-200 hover:bg-gray-300 
                 py-3 rounded-xl transition active:scale-95"
    >
      Clear Cart
    </button>

    <button
      onClick={handleCheckout}
      className="flex-1 bg-green-600 hover:bg-green-700 
                 text-white py-3 rounded-xl 
                 transition active:scale-95"
    >
      Checkout
    </button>
  </div>
 </div>
</div>
  );

};

export default Cart;