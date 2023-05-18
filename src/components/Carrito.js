import React, { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Carrito = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useContext(CartContext);
  const token = localStorage.getItem('token');
  const mesa = localStorage.getItem('mesa');

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handlePlaceOrder = () => {
    console.log(mesa);
    console.log(token);
    const orderData = {
      cartItems: cart,
      totalPrice: getTotalPrice(),
      token: token,
      mesa: mesa,
      // Otros datos que necesites enviar con el pedido
    };

    // Obtener el token y el número de mesa del localStorage



    // Verificar que el token y el número de mesa estén disponibles
    if (token && mesa) {
      // Realizar la solicitud POST a tu localhost con la ruta, mesa y token
      axios.post(`http://127.0.0.1:8000/api/cargar-productos/${mesa}/${token}`, orderData)
        .then(response => {
          // Manejar la respuesta de la API
          console.log(response.data);
        })
        .catch(error => {
          // Manejar los errores de la solicitud
          console.error(error);
        });
    } else {
      console.log('Token o número de mesa no disponibles');
    }
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
              {cart.length > 0 && (
                <div>
                  <p>Precio total: {getTotalPrice()} €</p>
                  <Button className='boton-borrar-carrito' onClick={() => handleClearCart()}>
                    Vaciar carrito
                  </Button>
                  <Button className='boton-hacer-pedido' onClick={() => handlePlaceOrder()}>
                    Hacer pedido
                  </Button>
                </div>
              )}
            </Card.Footer>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Carrito;


