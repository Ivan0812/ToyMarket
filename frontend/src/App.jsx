import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./components/Products";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";


function App() {
  return (
    <CartProvider>
   <Router>
   <Header />
    <main className="p-4"> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminOrders />} />
        </Routes>
    </main>
    <Footer />
   </Router>
    </CartProvider>
  );
}

export default App;