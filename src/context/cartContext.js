import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [mesa, setMesa] = useState(null);

  useEffect(() => {
    const storedMesa = localStorage.getItem('mesa');
    if (storedMesa) {
      setMesa(storedMesa);
    }
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      const newCart = [...cart];
      newCart.splice(itemIndex, 1);
      setCart(newCart);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    if (cart.length === 0) {
      return 0;
    }

    const totalPrice = cart.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );

    return totalPrice.toFixed(2);
  };

  useEffect(() => {
    if (mesa) {
      localStorage.setItem('mesa', mesa);
    } else {
      localStorage.removeItem('mesa');
    }
  }, [mesa]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice, mesa, setMesa }}
    >
      {children}
    </CartContext.Provider>
  );
};
