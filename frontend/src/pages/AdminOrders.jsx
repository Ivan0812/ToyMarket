import { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:3000/api/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete order");
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const copyLink = (id) => {
    const url = `${window.location.origin}/orders/${id}`;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (orders.length === 0) return <p className="text-center mt-10">No orders yet.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orders.map(order => (
        <div key={order._id} className="border p-4 rounded mb-4 shadow">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status || "Pending"}</p>
          <p><strong>Total:</strong> {order.totalPrice} €</p>

          <p><strong>Placed by:</strong></p>
          <ul className="ml-4 list-disc">
            <li><strong>Name:</strong> {order.user.name}</li>
            <li><strong>Email:</strong> {order.user.email}</li>
            <li><strong>Address:</strong> {order.user.address}</li>
            <li><strong>Payment:</strong> {order.user.payment}</li>
          </ul>

          <p className="mt-2"><strong>Items:</strong></p>
          <ul className="ml-4 list-disc">
            {order.cartItems.map(item => (
              <li key={item.name}>{item.name} x {item.quantity} - {item.price * item.quantity} €</li>
            ))}
          </ul>

          {/* Gumbi za akcije */}
          <div className="flex gap-2 mt-3 flex-wrap">
            <button
              onClick={() => updateStatus(order._id, "Sent")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
            >
              Mark as Sent
            </button>
            <button
              onClick={() => updateStatus(order._id, "Delivered")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
            >
              Mark as Delivered
            </button>
            <button
              onClick={() => deleteOrder(order._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => copyLink(order._id)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded"
            >
              Copy Link
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;