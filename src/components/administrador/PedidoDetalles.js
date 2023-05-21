import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PedidoDetalles() {
  const { mesaId } = useParams();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    async function fetchPedidoDetalles() {
      try {
        const response = await fetch(`http://tu-api.com/pedidos/${mesaId}`);
        const data = await response.json();
        setPedido(data);
      } catch (error) {
        console.error('Error al obtener los detalles del pedido:', error);
      }
    }

    fetchPedidoDetalles();
  }, [mesaId]);

  if (!pedido) {
    return <p>Cargando detalles del pedido...</p>;
  }

  return (
    <div className="pedido-detalles">
      <h2>Detalles del pedido para la Mesa {mesaId}</h2>
      <p>ID del pedido: {pedido.id}</p>
      <p>Cliente: {pedido.cliente}</p>
      {/* Mostrar más detalles del pedido según tus necesidades */}
    </div>
  );
}

export default PedidoDetalles;
