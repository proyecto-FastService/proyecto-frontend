import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiArrowLeft } from 'react-icons/fi';

function MesaCard() {
  const { mesaId } = useParams();
  const [productos, setProductos] = useState([]);
  const [estadoMesa, setEstadoMesa] = useState(0);
  const [refresh, setRefresh] = useState(false); // Estado para refrescar el componente

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    const enviarInfoMesa = async () => {
      try {
        const response = await axios.post(
          `https://daw206.medacarena.es/public/api/admComprobarProductosPorMesa/${token}/${mesaId}`
        );
        const data = response.data;
        setProductos(data.productos);
        setEstadoMesa(data.estadoMesa); // Actualizar el estado de la mesa
        console.log(data);
      } catch (error) {
        console.error('Error al enviar la información de la mesa:', error);
      }
    };
  
    enviarInfoMesa();
  
    const interval = setInterval(() => {
      enviarInfoMesa();
    }, 10000); // 10 seconds in milliseconds
  
    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, [mesaId, refresh]);
  

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
          await axios.post(`https://daw206.medacarena.es/public/api/admLiberarMesa/${token}/${mesaId}`);
          console.log('Mesa liberada exitosamente');

          // Mostrar SweetAlert2 para indicar que la mesa ha sido liberada exitosamente
          Swal.fire({
            title: 'Mesa liberada',
            text: 'La mesa ha sido liberada exitosamente',
            icon: 'success',
          });

          setRefresh(!refresh); // Actualizar el estado de refresh para refrescar el componente
        } catch (error) {
          console.error('Error al liberar la mesa:', error);
        }
      }
    });
  };




  const handleReservarMesa = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.post(`https://daw206.medacarena.es/public/api/admReservarMesa/${token}/${mesaId}`);
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
          {/* Imprimir la lista de productos */}
          <div className="mt-4">
            <h4>Productos:</h4>
            <ul>
              {productos.map((producto) => (
                <li key={producto.id}>{producto.nombre}</li>
              ))}
            </ul>
          </div>
  
          <div className="d-flex justify-content-between">
            <button
              className="btn-admin"
              onClick={handleReservarMesa}
              disabled={estadoMesa === 1}
            >
              Reservar mesa
            </button>
  
            <button className="btn-admin" onClick={handleLiberarMesa}>
              Liberar mesa
            </button>
          </div>
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


