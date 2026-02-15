// src/pages/OrderSuccess.jsx
import { useParams, Link } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";



const OrderSuccess = () => {

   const location = useLocation();

   const { id } = useParams();
   
   if (!location.state?.success) {
        return <Navigate to="/" />;
    }
    
  return (
    <div className="max-w-xl mx-auto text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order placed successfully 🎉
      </h1>

        {/* ORDER ID BOX */}
        <div className="bg-gray-100 border rounded-md p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">Your Order ID</p>
          <p className="font-mono text-lg font-semibold break-all">
            #{id}
          </p>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Please keep this Order ID for your records.
        </p>


      <p className="mb-6 text-gray-600">
        Thank you for your purchase. We’ll contact you shortly.
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Back to shop
      </Link>
    </div>
  );
};

export default OrderSuccess;