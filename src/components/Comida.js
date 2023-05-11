import React from 'react';
import imagenes from '../assets/imagenes';


class Comida extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
    };
  }

  addToCart(item) {
    this.setState(prevState => ({
      cartItems: [...prevState.cartItems, item],
    }));
  }

  render() {
    return (
      <div>

        <h2>Nuestros Platos:</h2>
        <button onClick={() => this.addToCart('flamenquin')}>
          <img src={imagenes.flamenquin} alt="Flamenquín Cordobés" />
        </button>
        <button onClick={() => this.addToCart('salmorejo')}>
          <img src={imagenes.salmorejo} alt="Salmorejo Cordobés" />
        </button>
        <button onClick={() => this.addToCart('berenjenas')}>
          <img src= {imagenes.berenjena} alt="Berenjenas fritas" />
        </button>
        <button onClick={() => this.addToCart('calamares')}>
          <img src={imagenes.calamares} alt="Calamares fritos" />
        </button>
        <button onClick={() => this.addToCart('puntillitas')}>
          <img src={imagenes.calamaritos} alt="Puntillitas fritas" />
        </button>
        <button onClick={() => this.addToCart('rabo')}>
          <img src={imagenes.rabo} alt="Rabo de Toro" />
        </button>
        <button onClick={() => this.addToCart('cazon')}>
          <img src={imagenes.cazon} alt="Cazón en adobo" />
        </button>
      </div>
    );
  }
}


export default Comida;