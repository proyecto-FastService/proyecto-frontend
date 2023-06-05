import React from 'react';
import tunante from '../img/tunantes.jpg'; // Ruta de la imagen de tu logo

const Tunante = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src={tunante} alt="Logo de Tunante" style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }} />
        </div>
    );
};

export default Tunante;
