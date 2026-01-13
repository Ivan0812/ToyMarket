import { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/orders");

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/orders/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update order status");
      }

      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  const deleteOrder = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete order");
      }

      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Error deleting order");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center mt-10">No orders yet.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin – Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-4 rounded mb-4 shadow bg-white"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Order ID: {order._id}</p>

            <span
              className={`px-3 py-1 rounded text-white text-sm ${
                order.status === "Delivered"
                  ? "bg-blue-600"
                  : order.status === "Sent"
                  ? "bg-green-600"
                  : "bg-yellow-500"
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Customer */}
          <div className="mb-3">
            <p className="font-semibold">Customer</p>
            <p>{order.user.name}</p>
            <p>{order.user.email}</p>
            <p>
              {order.user.street} {order.user.number},{" "}
              {order.user.postalCode} {order.user.city}
            </p>
            <p>Payment: {order.user.payment}</p>
          </div>

          {/* Items */}
          <div className="mb-3">
            <p className="font-semibold">Items</p>
            <ul className="list-disc ml-5">
              {order.cartItems.map((item) => (
                <li key={item._id}>
                  {item.name} × {item.quantity} —{" "}
                  {item.price * item.quantity} €
                </li>
              ))}
            </ul>
          </div>

          {/* Total */}
          <p className="font-bold mb-3">
            Total: {order.totalPrice} €
          </p>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            <button
              disabled={order.status === "Sent"}
              onClick={() => updateStatus(order._id, "Sent")}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-1 rounded"
            >
              Mark as Sent
            </button>

            <button
              disabled={order.status === "Delivered"}
              onClick={() => updateStatus(order._id, "Delivered")}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-1 rounded"
            >
              Mark as Delivered
            </button>

            <button
              onClick={() => deleteOrder(order._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;