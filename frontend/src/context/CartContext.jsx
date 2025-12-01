import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      // Ako je već u košarici → provjeri stock
      if (existing) {
        const desired = existing.quantity + product.quantity;

        if (desired > product.stock) {
          alert(`We only have ${product.stock} in stock.`);
          return prev;
        }

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: desired }
            : item
        );
      }

      // Ako se dodaje prvi put → provjera stock-a
      if (product.quantity > product.stock) {
        alert(`We only have ${product.stock} in stock.`);
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity, stock) => {
    if (quantity > stock) {
      alert(`We only have ${stock} in stock.`);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);