import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductEditor() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const obtenerListadoProducto = async () => {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/admObtenerListadoProducto/${token}`);
        // Realiza las acciones necesarias con la respuesta de la API
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener el listado de productos:', error);
      }
    };

    obtenerListadoProducto();
  }, [token]);

  return (
    <div>
      <h1>Product Editor</h1>
      {/* Aquí va el contenido del componente */}
    </div>
  );
}

export default ProductEditor;
