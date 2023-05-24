import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { CartContext } from '../context/cartContext';


function ProductList() {
  const { numeroMesa } = useParams();
  const { onAddToCart, setMesa } = useContext(CartContext);
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
      if (numeroMesa) {
        setMesa(numeroMesa); // Actualiza el valor de mesa en el contexto
      }
    }
    fetchData();
  }, [numeroMesa, token, setMesa]);

  return (
    <div className="product-list-container">
      <div className="product-list-column">
        {Array.isArray(productos) ? (
          productos.slice(0, Math.ceil(productos.length / 2)).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.nombre}
              description={product.descripcion}
              price={`${product.precio}€`}
              image={product.imagen}
              onAddToCart={() => onAddToCart(product)}
            />
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
      <div className="product-list-column">
        {Array.isArray(productos) ? (
          productos.slice(Math.ceil(productos.length / 2)).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.nombre}
              description={product.descripcion}
              price={`${product.precio}€`}
              image={product.imagen}
              onAddToCart={() => onAddToCart(product)}
            />
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  );
  
}

export default ProductList;
