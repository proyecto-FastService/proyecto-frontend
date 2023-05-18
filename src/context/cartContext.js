import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

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
      return 0; // Si el carrito está vacío, retorna 0 como precio total
    }
  
    const totalPrice = cart.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
    
    return totalPrice.toFixed(2); // Redondear el precio total a 2 decimales
  };
  
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

