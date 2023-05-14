import React, { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
    <div className='Body-Carrito'>
      <div className='d-flex justify-content-center'>
        <Card className="w-50 mt-5">
          <Card.Header>
            <h1 className='text-center'>Carrito</h1>
          </Card.Header>
          <Card.Body>
            {cart.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - {item.price} €
                    <Button
                      className='mx-2'
                      variant='danger'
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
              <Button variant='secondary' onClick={() => handleClearCart()}>
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

