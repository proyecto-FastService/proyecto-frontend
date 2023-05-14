import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import { CartContext } from '../context/cartContext';

function ProductList(props) {
  const { onAddToCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:8000/api/prueba2/1/');
      const data = await response.json();
      setProductos(data.productosEnStock);
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

