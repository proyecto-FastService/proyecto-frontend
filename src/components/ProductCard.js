import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CartContext } from '../context/cartContext';
import Swal from 'sweetalert';

function ProductCard(props) {
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    addToCart({
      id: props.id,
      title: props.title,
      price: props.price,
      image: props.image,
      quantity: 1
    });

    Swal({
      icon: 'success',
      title: 'Producto añadido',
      text: 'El producto se ha añadido al carrito.'
    });
  };

  return (
    <div>
      <Card className="container-card shadow-lg rounded mx-auto pb-5" style={{ maxWidth: '30rem' }}>
        <Card.Title className="card-title">{props.title}</Card.Title>
        <Card.Body>
          <Card.Img className="card-image" variant="top" src={props.image} alt={props.title} />
          <Card.Text className="card-description">{props.description}</Card.Text>
          <Button className="custom-button" onClick={handleClick}>
            {props.price}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard;
