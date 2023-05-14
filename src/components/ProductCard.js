import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CartContext } from '../context/cartContext';

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
  };

  return (
    <Card className="ProductCard shadow-lg rounded" style={{ width: '28rem' }}>
      <Card.Img variant="top" src={props.image} alt={props.title} />
      <Card.Body className="ProductCard-Body">
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Button className="ProductCard-Button" onClick={handleClick}>
          {props.price}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;

