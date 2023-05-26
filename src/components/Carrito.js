import React, { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

import { BsTrash } from 'react-icons/bs';

const Carrito = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useContext(CartContext);
  const token = localStorage.getItem('token');
  const mesa = localStorage.getItem('mesa');

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción vaciará el carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart(); // Vaciar el carrito
      }
    });
  };


  const handlePlaceOrder = () => {
    const orderData = {
      cartItems: cart,
      totalPrice: getTotalPrice(),
      token: token,
      mesa: mesa,
      // Otros datos que necesites enviar con el pedido
    };

    if (token && mesa) {
      axios.post(`http://127.0.0.1:8000/api/pedirListaProductosPorId/${token}`, { arrayProductosIds: orderData })
        .then(response => {
          console.log(response.data);
          Swal.fire("¡Oído cocina!", "¡Marchando!", "success");
          clearCart();
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.log('Token o número de mesa no disponibles');
    }
  };

  return (
    <div className='Body-Carrito d-flex flex-column flex-grow-1 pb-5'>
      <div className='d-flex justify-content-center'>
        <Card className="Card-Carrito w-50 mt-5 container-card">
          <Card.Header>
            <h1 className='text-center text-carrito-header '>Carrito</h1>
          </Card.Header>
          <Card.Body className='body-body-carrito '>
            {cart.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.title} - {item.price}
                    <Button className="btn btn-danger bg-transparent border-0 ms-2"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <BsTrash className="text-danger" />
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
                  <h4>Precio total: {getTotalPrice()} €</h4>
                  <div className='botones'>
                    <Button className="btn btn-warning btn-md" onClick={() => handlePlaceOrder()}>
                      Hacer pedido
                    </Button>
                    <Button className="btn btn-danger btn-md" onClick={() => handleClearCart()}>
                      Eliminar carrito
                    </Button>
                  </div>
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



