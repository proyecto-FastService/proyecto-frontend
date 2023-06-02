import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

import { TiDelete } from 'react-icons/ti';

const Carrito = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useContext(CartContext);
  const token = localStorage.getItem('token');
  const mesa = localStorage.getItem('mesa');
  const navigate = useNavigate();

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
      Swal.fire({
        title: '¡Marchando! Estamos enviando tu pedido a la cocina',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
          axios
            .post(`https://daw206.medacarena.es/public/api/pedirListaProductosPorId/${token}`, { arrayProductosIds: orderData })
            .then(response => {
              console.log(response.data);
              setTimeout(() => {
                Swal.fire("¡Oído cocina!","success").then(() => {
                  clearCart();
                  navigate(`/productos/${mesa}`); // Redireccionar a "/productos/${mesa}"
                });
              }, 500); // Retraso de 1 segundo antes de mostrar la segunda alerta
            })
            .catch(error => {
              console.error(error);
            })
            .finally(() => {
              Swal.close();
            });
        },
      });
    } else {
      console.log('Token o número de mesa no disponibles');
    }
  };
  


  return (
    <div className='Body-Carrito d-flex flex-column flex-grow-1 pb-5'>
      <div className='d-flex justify-content-center'>
        <Card className="Card-Carrito w-full mt-5 container-card">
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
                    <div className="product-container">
                      <Button
                        className="btn btn-danger bg-transparent border-0 mr-2"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        <TiDelete className="text-danger" />
                      </Button>
                      <img src={item.image} alt={item.title} className="product-image" />
                      <p>{item.title} - {item.price}</p>
                    </div>
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
                      PEDIR A COCINA
                    </Button>
                    <Button className="btn btn-danger btn-md" onClick={() => handleClearCart()}>
                      VACIAR CARRITO ENTERO
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


