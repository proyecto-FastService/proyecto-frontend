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
        const response = await axios.get(`http://127.0.0.1:8000/api/admObtenerTodasMesas/${token}`);
        setMesas(response.data);
        const data = await response.json();
        localStorage.setItem('token', data.token);
      } catch (error) {
        console.error('Error al obtener las mesas:', error);
      }
    };

    obtenerMesas();
  }, []);

  const handleClickMesa = (mesaId) => {
    navigate(`/productos/0/${mesaId}`);
  };

  return (
    <div>
      <h1>Panel de Administrador</h1>

      <div>
        {mesas.map((mesa) => (
          <div key={mesa.id} className="card" onClick={() => handleClickMesa(mesa.id)}>
            <h2>Mesa {mesa.numero}</h2>
            <p>Descripción de la mesa</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;







