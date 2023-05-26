import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { CartContext } from '../context/cartContext';

function ProductListBebida() {
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
      console.log(productos);
      if (token == null) {
        localStorage.setItem('token', data.token);
      }
      if (numeroMesa) {
        setMesa(numeroMesa); // Actualiza el valor de mesa en el contexto
      }
    }
    fetchData();
  }, [numeroMesa, token, setMesa]);

  // Filtrar los productos por la categoría "bebida"
  const bebidas = productos.filter((product) => product.categoria === 'bebida');

  return (
    <div className="product-list-container">
      <div className="product-list-column">
        {Array.isArray(bebidas) ? (
          bebidas.slice(0, Math.ceil(bebidas.length / 2)).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.nombre}
              description={product.descripcion}
              price={`${product.precio}€`}
              image={`../${product.imagen}`}
              onAddToCart={() => onAddToCart(product)}
            />
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
      <div className="product-list-column">
        {Array.isArray(bebidas) ? (
          bebidas.slice(Math.ceil(bebidas.length / 2)).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.nombre}
              description={product.descripcion}
              price={`${product.precio}€`}
              image={`../${product.imagen}`}
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

export default ProductListBebida;


