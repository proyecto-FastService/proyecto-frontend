import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Admin() {
  const [mesas, setMesas] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const obtenerMesas = async () => {
      try {
        let response2;
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

  const handleEditarProductos = () => {
    navigate('/0/editar-productos');
  };

  return (
    <div>
      <h1>Panel de Administrador</h1>

      <div>
        {mesas.map((mesa) => (
          <div key={mesa.id} className="card" >
            <h2>Mesa {mesa.id}</h2>
            <button onClick={() => handleClickMesa(mesa.id)}>Administrar Mesa</button>
            <p>Descripción de la mesa</p>
          </div>
        ))}
      </div>

      <Button onClick={handleEditarProductos}>Gestionar Productos</Button>
    </div>
  );
}

export default Admin;








