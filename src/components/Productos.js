import React from 'react';
import ProductList from './ProductList';

class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      products: []
    };
  }

  render() {
    return (
      <div className="product-list">
        <ProductList/>
      </div>
    );
  }
}

export default Productos;