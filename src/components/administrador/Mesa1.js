import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Mesa1() {
  const navigate = useNavigate();
  const { mesaId } = useParams();
  console.log({ mesaId });
  const handleClick = () => {
    navigate('/productos/0'); // Navegar de regreso al panel de administrador
  };

  return (
    
    <div>
      
      <h3>Mesa {mesaId}</h3>
      {/* Mostrar más información o detalles específicos de la Mesa 1 */}

      <button onClick={handleClick}>Volver al Panel de Administrador</button>
    </div>
  );
}

export default Mesa1;

