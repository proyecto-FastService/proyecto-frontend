import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function Admin() {
  return (
    <div>
      <h1>Panel de Administrador</h1>

      <div className="card-container">
        <Link to="/productos/0/mesa1" className="card">
          <h2>Mesa 1</h2>
          <p>Detalles</p>
        </Link>
        <Link to="/productos/0/mesa2" className="card">
          <h2>Mesa 2</h2>
          <p>Detalles</p>
        </Link>
        <Link to="/productos/0/mesa3" className="card">
          <h2>Mesa 3</h2>
          <p>Detalles</p>
        </Link>
      </div>
    </div>
  );
}

export default Admin;





