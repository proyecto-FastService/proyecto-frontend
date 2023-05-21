import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/cartContext';
import axios from 'axios';

const Pagar = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const token = localStorage.getItem('token');
  const [productosNoPagados, setProductosNoPagados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/devolverProductosPedidosNoPagados/${token}`);
        setProductosNoPagados(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const handlePagarCarrito = async () => {
    try {
      await axios.get(`/pagarCarrito/${token}`);
      clearCart(); // Vaciar el carrito al hacer la solicitud de pago exitosamente
      localStorage.clear(); // Limpiar el localStorage al hacer la solicitud de pago exitosamente
      // Aquí puedes agregar el código adicional para manejar la respuesta de la API después de hacer la solicitud
    } catch (error) {
      // Aquí puedes manejar los errores en caso de que ocurra alguno durante la solicitud
    }
  };

  return (
    <div>
      <h2>Total a pagar: ${getTotalPrice()}</h2>
      <button onClick={handlePagarCarrito}>Pagar</button>

      <h2>Productos No Pagados:</h2>
      <ul>
        {productosNoPagados.map((producto) => (
          <li key={producto.id}>{producto.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Pagar;




