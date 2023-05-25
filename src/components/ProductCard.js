import React, { useContext, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CartContext } from '../context/cartContext';
import Swal from 'sweetalert';
import ScrollUpButton from 'react-scroll-up-button';


// Establece el elemento raíz para el modal

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
      <Card className="ProductCard shadow-lg rounded mx-auto pb-5" style={{ maxWidth: '30rem'}}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Body className="ProductCard-Body">
          <Card.Img variant="top" src='./img/fast-service-logo.jpg' alt={props.title} />
          <Card.Text>{props.description}</Card.Text>       
          <Button className="btn btn-warning border-dark "  onClick={handleClick}>
            {props.price}
          </Button>   
        </Card.Body>        
      </Card>
      <ScrollUpButton ContainerClassName="scroll-up-button-container"
        TransitionClassName="scroll-up-button-transition"
      />
    </div>
  );
}

export default ProductCard;