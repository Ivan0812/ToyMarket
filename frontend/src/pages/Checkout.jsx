import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    number: "",
    city: "",
    postalCode: "",
    payment: "cash",
  });

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const { name, email, street, number, city, postalCode } = formData;

    if (!name || !email || !street || !number || !city || !postalCode) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cart,
          totalPrice,
          user: formData,
        }),
      });

      const data = await res.json();
      setMessage(data.message);

      setTimeout(() => {
        clearCart();
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0)
    return <p className="text-center mt-10">Your cart is empty.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* 🧾 Lista artikala */}
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-2 border-b pb-2">
          <p>{item.name} x {item.quantity}</p>
          <p>{item.price * item.quantity} €</p>
        </div>
      ))}

      <p className="text-lg font-bold mt-4">Total: {totalPrice} €</p>

      {/* 📋 Forma */}
      <div className="mt-6 space-y-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full name"
          className="w-full border rounded p-2"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          className="w-full border rounded p-2"
        />
        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street"
          className="w-full border rounded p-2"
        />
        <input
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="House Number"
          className="w-full border rounded p-2"
        />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full border rounded p-2"
        />
        <input
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          placeholder="Postal Code"
          className="w-full border rounded p-2"
        />

        <div className="flex gap-4 mt-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={formData.payment === "cash"}
              onChange={handleChange}
            />
            Cash on delivery
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={formData.payment === "card"}
              onChange={handleChange}
            />
            Credit card
          </label>
        </div>
      </div>

      {/* 🔘 Gumb */}
      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition active:scale-95"
      >
        {loading ? "Placing order..." : "Place Order"}
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default Checkout;