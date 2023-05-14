import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import { CartContext } from '../context/cartContext';

function ProductList(props) {
  const { onAddToCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      let response;
      if (token != null) {
        console.log(token)
        let ruta = "http://127.0.0.1:8000/api/prueba2/1/" + token;
        response = await fetch(ruta);
      } else {
        response = await fetch('http://127.0.0.1:8000/api/prueba2/1/');
      }
      const data = await response.json();
      setProductos(data);
      console.log(productos)
      if (token == null) {
        localStorage.setItem('token', data.token);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="product-list">
      {productos.map((product) => (
        <ProductCard
          key={product.id}
          title={product.nombre}
          description={product.descripcion}
          price={`$${product.precio}`}
          image={product.imagen}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
}

export default ProductList;


