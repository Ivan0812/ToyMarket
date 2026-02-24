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
    <div className="max-w-6xl mx-auto p-6">
  <h1 className="text-2xl font-bold mb-6">Admin – Orders</h1>

  <div className="overflow-x-auto">

  <div className="mb-4 flex justify-between">
  <p>Total orders: {orders.length}</p>
  <p>
    Revenue: {orders.reduce((acc, o) => acc + o.totalPrice, 0)} €
  </p>
</div>

    <table className="w-full border-collapse bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-3">Order ID</th>
          <th className="p-3">Customer</th>
          <th className="p-3">Total</th>
          <th className="p-3">Status</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="border-t">
            <td className="p-3">{order._id.slice(-6)}</td>
            <td className="p-3">
              {order.user.name}
              <br />
              <span className="text-sm text-gray-500">
                {order.user.email}
              </span>
            </td>

            <td className="p-3 font-semibold">
              {order.totalPrice} €
            </td>

            <td className="p-3">
              <span className={`px-2 py-1 rounded text-white text-sm ${
                order.status === "Delivered"
                  ? "bg-blue-600"
                  : order.status === "Sent"
                  ? "bg-green-600"
                  : "bg-yellow-500"
              }`}>
                {order.status}
              </span>
            </td>

            <td className="p-3 flex gap-2 flex-wrap">
              <button
                onClick={() => updateStatus(order._id, "Sent")}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Sent
              </button>

              <button
                onClick={() => updateStatus(order._id, "Delivered")}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Delivered
              </button>

              <button
                onClick={() => deleteOrder(order._id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default AdminOrders;