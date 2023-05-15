import React, { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import ProductList from './ProductList';

const Productos = () => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    
  };

  

  return (
    <div className="product-list">
      <ProductList onAddToCart={handleAddToCart} />
    </div>
  );
  
};

export default Productos;
