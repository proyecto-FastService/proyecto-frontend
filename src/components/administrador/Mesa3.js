import React from 'react';
import { useNavigate } from 'react-router-dom';

function Mesa3() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/productos/0'); // Navegar de regreso al panel de administrador
  };

  return (
    <div>
      <h3>Mesa 3</h3>
      {/* Mostrar más información o detalles específicos de la Mesa 1 */}

      <button onClick={handleClick}>Volver al Panel de Administrador</button>
    </div>
  );
}

export default Mesa3;

