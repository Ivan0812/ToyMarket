// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartAnimation, setCartAnimation] = useState(false);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 400);

    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        const desired = existing.quantity + product.quantity;

        if (desired > product.stock) {
          alert(`We only have ${product.stock} in stock.`);
          return prev;
        }

        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: desired }
            : item
        );
      }

      if (product.quantity > product.stock) {
        alert(`We only have ${product.stock} in stock.`);
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeFromCart = (_id) => {
    setCart((prev) => prev.filter((item) => item._id !== _id));
  };

  const updateQuantity = (_id, quantity, stock) => {
    if (quantity > stock) {
      alert(`We only have ${stock} in stock.`);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        cartAnimation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);