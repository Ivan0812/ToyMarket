import { useCart } from "../context/CartContext";
import { NavLink, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import TMLogo from "./TMLogo";

function Header() {
  const { cart, cartAnimation } = useCart();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-blue-500/90 text-white h-24 flex items-center shadow-md">
      <nav className="flex items-center justify-between max-w-7xl mx-auto w-full px-4">

        <TMLogo />

        {/* NAV LINKS */}
        
          <div className="flex gap-2 bg-blue-600 p-1 rounded-full relative">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  "relative px-4 py-2 rounded-full transition-colors duration-200 " +
                  (isActive ? "text-blue-600" : "text-white hover:text-yellow-300")
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                      className="absolute inset-0 bg-white rounded-full z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    )}

                    <span className="relative z-10">
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        

        {/* CART */}
       {/* CART */}
{/* CART */}
<Link
  to="/cart"
  className="relative flex items-center justify-center w-11 h-11 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
>
  <ShoppingCart
    size={20}
    className={`transition-transform duration-300 ${
      cartAnimation ? "scale-125 text-yellow-300" : "text-white"
    }`}
  />

  {cart.length > 0 && (
    <span
      className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-300 ${
        cartAnimation ? "scale-125" : ""
      }`}
    >
      {cart.reduce((acc, item) => acc + item.quantity, 0)}
    </span>
  )}
</Link>
      </nav>
    </header>
  );
}

export default Header;