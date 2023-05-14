import React from 'react';
import ProductCard from './ProductCard';
import { CartContext } from '../context/cartContext';
import patatasFritas from './patatas-fritas.jpg';
import hamburguesa from './hamburguesa.jpg';

function ProductList(props) {
  const { onAddToCart } = React.useContext(CartContext);

  const products = [
    {
      id: 1,
      title: 'Patatas fritas',
      description: 'Una deliciosa hamburguesa con queso cheddar y tocino',
      price: '$10.99',
      image: patatasFritas
    },
    {
      id: 2,
      title: 'Hamburguesa',
      description: 'Una pizza de pepperoni y champiñones recién horneada',
      price: '$12.99',
      image: hamburguesa
    },
    // más productos aquí
  ];

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
}

export default ProductList;
