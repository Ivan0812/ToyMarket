import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>

      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-semibold">{item.name}</p>
              <div className="flex items-center gap-2 mt-1">
                {/* Button za smanjivanje količine */}
                <button
                  onClick={() => {
                    if (item.quantity > 1) {
                      addToCart({ ...item, quantity: -1 }); // smanji količinu
                    } else {
                      removeFromCart(item.id); // ako je 1, ukloni iz košarice
                    }
                  }}
                  className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                {/* Button za povećanje količine */}
                <button
                  onClick={() => {
                    // ograniči na maksimalnu količinu iz backenda
                    if (!item.availableQuantity || item.quantity < item.availableQuantity) {
                      addToCart(item); // ovo će povećati količinu
                    }
                  }}
                  className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <p>{item.price} €</p>
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

       
        <button
        onClick={handleCheckout}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;