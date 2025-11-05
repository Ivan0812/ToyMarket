import { useCart } from "../context/CartContext";
import { useState } from "react";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cart, totalPrice, user: "Guest" }),
      });

      const data = await res.json();
      setMessage(data.message);
      clearCart();
    } catch (error) {
      console.error(error);
      setMessage("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return <p className="text-center mt-10">Your cart is empty.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.map(item => (
        <div key={item.id} className="flex justify-between mb-2 border-b pb-2">
          <p>{item.name} x {item.quantity}</p>
          <p>{item.price * item.quantity} €</p>
        </div>
      ))}
      <p className="text-lg font-bold mt-4">Total: {totalPrice} €</p>
      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Placing order..." : "Place Order"}
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default Checkout;