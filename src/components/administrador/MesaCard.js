import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MesaCard() {
  const { mesaId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const enviarInfoMesa = async () => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/admComprobarProductosPorMesa/${token}/${mesaId}`
        );
        const data = response.data;
        // Realiza las acciones necesarias con la respuesta de la API
        console.log(data);
      } catch (error) {
        console.error('Error al enviar la información de la mesa:', error);
      }
    };

    enviarInfoMesa();
  }, [mesaId]);

  return (
    <div className="card">
      <h2>Mesa {mesaId}</h2>
      <p>Descripción de la mesa {mesaId}</p>
    </div>
  );
}

export default MesaCard;


