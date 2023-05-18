import React, { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Carrito = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useContext(CartContext);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className='Body-Carrito'>
      <div className='d-flex justify-content-center'>
        <Card className="Card-Carrito w-50 mt-5">
          <Card.Header>
            <h1 className='text-center text-carrito-header'>Carrito</h1>
          </Card.Header>
          <Card.Body className='body-body-carrito'>
            {cart.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.title} - {item.price}
                    <Button
                      className='Carrito-Button mx-2'
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Eliminar
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Card.Body>
          {cart.length > 0 && (
            <Card.Footer>
              <p>Precio total: {getTotalPrice()} € </p>
              <Button className='boton-borrar-carrito' onClick={() => handleClearCart()}>
                Vaciar carrito
              </Button>
            </Card.Footer>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Carrito;


