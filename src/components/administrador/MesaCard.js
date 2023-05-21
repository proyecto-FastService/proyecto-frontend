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

  const handleLiberarMesa = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://127.0.0.1:8000/api/admLiberarMesa/${token}/${mesaId}`);
      console.log('Mesa liberada exitosamente');
    } catch (error) {
      console.error('Error al liberar la mesa:', error);
    }
  };

  const handleReservarMesa = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://127.0.0.1:8000/api/admReservarMesa/${token}/${mesaId}`);
      console.log('Mesa reservada exitosamente');
    } catch (error) {
      console.error('Error al reservar la mesa:', error);
    }
  };

  return (
    <div className="card">
      <h2>Mesa {mesaId}</h2>
      <p>Descripción de la mesa {mesaId}</p>
      <button onClick={handleLiberarMesa}>Liberar Mesa</button>
      <button onClick={handleReservarMesa}>Reservar Mesa</button>
    </div>
  );
}

export default MesaCard;
