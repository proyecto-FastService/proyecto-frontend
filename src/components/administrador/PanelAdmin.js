import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

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
    <div className='d-flex' style={{ flexDirection: 'column' }}>
      <h1 className='text-center'>Panel de Administrador</h1>
      <div className='d-flex justify-content-center align-items-center flex-wrap' >
        {mesas.map((mesa) => (
          <Card key={mesa.id} className='m-3 container-card' style={{ width: '20rem' }}>
            <Card.Body>
              <Card.Title>Mesa {mesa.id}</Card.Title>
              <Button className='btn-admin' onClick={() => handleClickMesa(mesa.id)}>Administrar</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Admin;







