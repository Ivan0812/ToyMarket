// src/pages/OrderSuccess.jsx
import { Link } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";


const OrderSuccess = () => {

   const location = useLocation();
   
   if (!location.state?.success) {
        return <Navigate to="/" />;
    }
    
  return (
    <div className="max-w-xl mx-auto text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order placed successfully 🎉
      </h1>

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