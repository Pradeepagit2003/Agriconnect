import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({});
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <CartContext.Provider value={{ user, login, logout, cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
