import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [mesas, setMesas] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const obtenerMesas = async () => {
      try {
        let response2;
        const token = localStorage.getItem('token');

        if (token != null) {
          let ruta = `http://127.0.0.1:8000/api/admObtenerToken/0/${token}`;
          response2 = await fetch(ruta);
        } else {
          response2 = await fetch(`http://127.0.0.1:8000/api/admObtenerToken/0/`);
        }

        const data2 = await response2.json();
        if (token == null) {
          localStorage.setItem('token', data2.token);
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/admObtenerTodasMesas/${token}`);
        setMesas(response.data.mesas);
        console.log(mesas);
      } catch (error) {
        console.error('Error al obtener las mesas:', error);
      }
    };

    obtenerMesas();
  }, []);

  const handleClickMesa = (mesaId) => {
    navigate(`/productos/0/${mesaId}`);
  };

  const handleEditarProductos = () => {
    navigate('/0/editar-productos');
  };

  return (
    <div className='d-flex' style={{ flexDirection: 'column' }}>
      <h1 className='text-center'>Panel de Administrador</h1>
      <div className='d-flex justify-content-center align-items-center flex-wrap'>
        {mesas.map((mesa) => (
          <div key={mesa.id} className='m-3 container-card' style={{ width: '20rem', position: 'relative' }}>
            <div className='card-body'>
              <h5 className='card-title'>Mesa {mesa.id}</h5>
              <div
                className={`badge position-absolute top-0 end-0 translate-middle p-2 ${mesa.ocupada ? 'ocupada-badge' : 'libre-badge'}`}
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
    </div>
  );
}

export default Admin;










