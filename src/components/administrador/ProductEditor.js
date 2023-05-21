import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductEditor() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerListadoProducto = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/admObtenerListadoProducto/${token}`);
        const data = response.data.productos;
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener el listado de productos:', error);
      }
    };

    obtenerListadoProducto();
  }, [token]);

  const ocultarProducto = async (idProducto) => {
    try {
      await axios.get(`http://127.0.0.1:8000/api/admOcultarProducto/${token}/${idProducto}`);
      // Realizar acciones adicionales si es necesario
    } catch (error) {
      console.error('Error al ocultar el producto:', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Productos</h1>
      <div>
        {productos.map((producto) => (
          <div key={producto.id} className="card">
            <h2>{producto.nombre}</h2>
            <p>Existencias: {producto.existencias}</p>
            <p>Precio: {producto.precio}</p>
            <p>Descripción: {producto.descripcion}</p>
            <p>Ingredientes: {producto.ingredientes}</p>
            <button onClick={() => ocultarProducto(producto.id)}>Ocultar Producto</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductEditor;
