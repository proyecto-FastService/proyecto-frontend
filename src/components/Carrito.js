import React, { useContext } from 'react';
import { CartContext } from '../context/cartContext';

const Carrito = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  console.log('Carrito:', cart);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div>
      <h1>Carrito</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price} €
                <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <button onClick={() => handleClearCart()}>Vaciar carrito</button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
