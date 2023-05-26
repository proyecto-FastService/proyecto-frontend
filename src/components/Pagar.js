import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/cartContext';
import axios from 'axios';
import Swal from 'sweetalert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Pagar = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const token = localStorage.getItem('token');
  const [productosNoPagados, setProductosNoPagados] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/devolverProductosPedidosNoPagados/${token}`);
        setProductosNoPagados(response.data.productosNoPagados);
        
        // Calcular el precio total sumando los precios de los productos no pagados
        const total = response.data.productosNoPagados.reduce((accumulator, producto) => {
          return accumulator + producto.precio;
        }, 0);
        setPrecioTotal(total);

        console.log(productosNoPagados);
        console.log(precioTotal);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const handlePagarCarrito = async () => {
    try {
      await axios.get(`http://127.0.0.1:8000/api/pagarCarrito/${token}`);
      clearCart(); // Vaciar el carrito al hacer la solicitud de pago exitosamente
      localStorage.clear(); // Limpiar el localStorage al hacer la solicitud de pago exitosamente

      // Mostrar SweetAlert de confirmación
      Swal("¡Pago exitoso!", "El pago se ha realizado correctamente", "success");

      // Aquí puedes agregar el código adicional para manejar la respuesta de la API después de hacer la solicitud
    } catch (error) {
      // Aquí puedes manejar los errores en caso de que ocurra alguno durante la solicitud
    }
  };

  return (
    <div className='Body-Carrito d-flex flex-column flex-grow-1 pb-5'>
      <div className='d-flex justify-content-center '>
        <Card className="Card-Carrito w-50 mt-5 container-card">
          <Card.Header>
            <h2 className='text-center text-carrito-header'>Productos pendientes de pago:</h2>
          </Card.Header>
          <Card.Body className='body-body-carrito'>
            <div>
              <ul>
                {productosNoPagados.map((producto) => (
                  <li key={producto.id}>
                    {producto.nombre} - {producto.precio}€
                  </li>
                ))}
              </ul>
              
            </div>
          </Card.Body>
          <h4>Precio total: {precioTotal} €</h4>
          <div className='botones'>
            <button className="btn btn-warning btn-md" onClick={handlePagarCarrito}>Pagar</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Pagar;
