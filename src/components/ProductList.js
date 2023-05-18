import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import { CartContext } from '../context/cartContext';

function ProductList(props) {
  const { onAddToCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const token = localStorage.getItem('token');
  const mesa = localStorage.getItem('mesa') || 1; // Obtener el número de mesa almacenado o utilizar el valor predeterminado (1)

  useEffect(() => {
    async function fetchData() {
      let response;
      if (token != null) {
        console.log(token)
        console.log(mesa)
        let ruta = `http://127.0.0.1:8000/api/prueba2/${mesa}/${token}`;
        response = await fetch(ruta);
      } else {
        response = await fetch(`http://127.0.0.1:8000/api/prueba2/${mesa}/`);
      }
      const data = await response.json();
      setProductos(data);
      console.log(data)
      if (token == null) {
        localStorage.setItem('token', data.token);
      }
      localStorage.setItem('mesa', mesa); // Guardar el número de mesa en el localStorage
    }
    fetchData();
  }, [mesa, token]);

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



