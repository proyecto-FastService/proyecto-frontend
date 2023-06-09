import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Admin() {
  const [mesas, setMesas] = useState([]);
  const [refresh, setRefresh] = useState(false); // Estado para refrescar el componente
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { numeroMesa } = useParams();

  useEffect(() => {
    if (numeroMesa) {
      localStorage.setItem('mesa', numeroMesa);
    }
  }, [numeroMesa]);

  useEffect(() => {
    const obtenerMesas = async () => {
      try {
        let response2;
        const token = localStorage.getItem('token');

        if (token != null) {
          let ruta = `https://daw206.medacarena.es/public/api/admObtenerToken/0/${token}`;
          response2 = await fetch(ruta);
          console.log(mesas);
        } else {
          response2 = await fetch(`https://daw206.medacarena.es/public/api/admObtenerToken/0`);
        }

        const data2 = await response2.json();
        if (token == null) {
          localStorage.setItem('token', data2.token);
        }

        const response = await axios.get(`https://daw206.medacarena.es/public/api/admObtenerTodasMesas/${token}`);
        setMesas(response.data.mesas);
        console.log(mesas);
      } catch (error) {
        console.error('Error al obtener las mesas:', error);
      }
    };

    obtenerMesas();
  }, [refresh]); // Escucha cambios en el estado 'refresh'

  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh(!refresh); // Cambiar el valor del estado 'refresh' cada 5 segundos
    }, 5000);

    return () => {
      clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    };
  }, [refresh]);


  

  const handleClickMesa = (mesaId) => {
    navigate(`/productos/admin/0/${mesaId}`);
  };

  const confirmarAtenderMesa = async (mesa) => {
    const result = await Swal.fire({
      title: 'Confirmar atender mesa',
      text: `¿Estás seguro de que quieres atender la mesa ${mesa.id}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.get(`https://daw206.medacarena.es/public/api/mesaAtendida/${mesa.codigo}`);
        console.log(response.data);
        // Realizar acciones adicionales después de atender la mesa

        Swal.fire('Mesa Atendida', 'La mesa ha sido atendida correctamente.', 'success');

        setRefresh(!refresh); // Actualizar el estado 'refresh' para refrescar el componente
      } catch (error) {
        console.error('Error al atender la mesa:', error);
        Swal.fire('Error', 'Ocurrió un error al atender la mesa.', 'error');
      }
    }
  };

  const handleCerrarSesion = async () => {
    const result = await Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estás seguro de que quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.get(`https://daw206.medacarena.es/public/api/cerrarSesion/${token}`);
        console.log(response.data);
        // Limpiar el token del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('mesa');

        Swal.fire('Sesión cerrada', 'La sesión ha sido cerrada correctamente.', 'success');

        navigate('/'); // Redireccionar a la página de inicio de sesión
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        Swal.fire('Error', 'Ocurrió un error al cerrar la sesión.', 'error');
      }
    }
  };

  const handleLimpiarMesas = async () => {
    const result = await Swal.fire({
      title: 'Limpiar mesas',
      text: '¿Estás seguro de que quieres limpiar las mesas?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.get(`https://daw206.medacarena.es/public/api/limpiarMesas/${token}`);
        console.log(response.data);

        Swal.fire('Mesas limpiadas', 'Las mesas han sido limpiadas correctamente.', 'success');

        setRefresh(!refresh); // Actualizar el estado 'refresh' para refrescar el componente
      } catch (error) {
        console.error('Error al limpiar las mesas:', error);
        Swal.fire('Error', 'Ocurrió un error al limpiar las mesas.', 'error');
      }
    }
  };

  return (
    <div className='d-flex' style={{ flexDirection: 'column' }}>
      <h1 className='text-center card-title-admin mt-5'>Panel de Administrador</h1>
      <div className='d-flex justify-content-center align-items-center flex-wrap'>
        {mesas.map((mesa) => (
          <div key={mesa.id} className='m-3 container-card' style={{ width: '20rem', position: 'relative' }}>
            <div className='card-body-admin'>
              <h5 className='card-title'>Mesa {mesa.id}</h5>
              <div
                className={`badge position-absolute top-0 start-0 p-2 ${mesa.avisoCamarero ? 'aviso-camarero-badge' : 'd-none'
                  }`}
                style={{
                  backgroundColor: 'yellow',
                  color: 'black',
                  cursor: 'pointer',
                }}
                onClick={() => confirmarAtenderMesa(mesa)}
              >
                <FaUser />
              </div>
              <div
                className={`badge position-absolute top-0 end-0 translate-middle p-2 ${mesa.ocupada ? 'ocupada-badge' : 'libre-badge'
                  }`}
                style={{
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: mesa.ocupada ? 'red' : 'green',
                  color: 'white',
                }}
              >
                {mesa.ocupada ? 'Ocupada' : 'Libre'}
              </div>
              <button className='btn-admin mt-3' onClick={() => handleClickMesa(mesa.id)}>
                Administrar
              </button>

            </div>
          </div>
        ))}
      </div>
      <div className='card' style={{ width: "300px", height: "300px", background: "linear-gradient(135deg, #FF94B4 0%, #FFD291 50%, #96CFFF 100%)", borderRadius: "10%" }}>
        <div className='card-body d-flex flex-column justify-content-center'>
          <h2>Demo zone</h2>
          <p>Las mesas pueden tardar hasta 10 segundos en aparecer, tenga paciencia</p>
          <button className='btn-admin mt-3 w-100' onClick={handleCerrarSesion}>
            Cerrar sesión admin
          </button>
          <button className='btn-admin mt-3 w-100' onClick={handleLimpiarMesas}>
            Resetear todas las mesas
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
