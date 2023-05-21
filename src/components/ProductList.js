import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { CartContext } from '../context/cartContext';

function ProductList() {
  const { numeroMesa } = useParams();
  const { onAddToCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      let response;
      if (token != null) {
        let ruta = `http://127.0.0.1:8000/api/cargar-productos/${numeroMesa}/${token}`;
        response = await fetch(ruta);
      } else {
        response = await fetch(`http://127.0.0.1:8000/api/cargar-productos/${numeroMesa}/`);
      }
      const data = await response.json();
      setProductos(data);
      if (token == null) {
        localStorage.setItem('token', data.token);
      }
      localStorage.setItem('mesa', numeroMesa); // Guardar el número de mesa en el localStorage
    }
    fetchData();
  }, [numeroMesa, token]);

  return (
    <div className="product-list">
      {productos.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.nombre}
          description={product.descripcion}
          price={`${product.precio}€`}
          image={product.imagen}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
}

export default ProductList;




