import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert';


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
  
    // Mostrar SweetAlert para confirmar la liberación de la mesa
    Swal({
      title: "¿Estás seguro?",
      text: "Esta acción liberará la mesa",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.post(`http://127.0.0.1:8000/api/admLiberarMesa/${token}/${mesaId}`);
          console.log('Mesa liberada exitosamente');
        } catch (error) {
          console.error('Error al liberar la mesa:', error);
        }
      }
    });
  };
  

  const handleReservarMesa = async () => {
    const token = localStorage.getItem('token');
  
    try {
      await axios.post(`http://127.0.0.1:8000/api/admReservarMesa/${token}/${mesaId}`);
      console.log('Mesa reservada exitosamente');
  
      // Mostrar SweetAlert de confirmación
      Swal("¡Mesa reservada!", "La mesa se ha reservado correctamente", "success");
    } catch (error) {
      console.error('Error al reservar la mesa:', error);
    }
  };
  

  return (
      <div className="card">
      <h2>Mesa {mesaId}</h2>
      <p>Descripción de la mesa {mesaId}</p>
      <button onClick={handleReservarMesa}>Reservar Mesa</button>
      <button onClick={handleLiberarMesa}>Liberar Mesa</button>
    </div>
    
  );
}

export default MesaCard;
