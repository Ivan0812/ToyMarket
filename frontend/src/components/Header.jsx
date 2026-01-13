import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Header() {
  const { cart, cartAnimation } = useCart();

  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Lijevi dio - linkovi */}
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Desni dio - ikona košarice */}
        <Link to="/cart" className="relative inline-flex items-center">
        <ShoppingCart
          size={24}
          className={`transition-transform duration-300 ${
          cartAnimation ? "scale-125 text-yellow-300" : ""
          }`}
        />
          {cart.length > 0 && (
            <span
            className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-300 ${
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