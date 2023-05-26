import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiArrowLeft } from 'react-icons/fi';

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
  
    // Mostrar SweetAlert2 para confirmar la liberación de la mesa
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción liberará la mesa',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
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
      Swal.fire({
        title: '¡Mesa reservada!',
        text: 'La mesa se ha reservado correctamente',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error al reservar la mesa:', error);
    }
  };

  return (
    <div>
      <h2 className="text-center">Mesa {mesaId}</h2>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <div className="m-3 container-card" style={{ width: '40rem' }}>
          <button className="btn-admin" onClick={handleReservarMesa}>
            Reservar Mesa
          </button>
          <button className="btn-admin" onClick={handleLiberarMesa}>
            Liberar Mesa
          </button>
        </div>
      </div>
      <div className="text-center">
        <Link to="/productos/0" className="text-black">
          <FiArrowLeft className="mr-1" /> Volver al Panel de Administración
        </Link>
      </div>
    </div>
  );
}

export default MesaCard


