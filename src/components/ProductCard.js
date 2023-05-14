import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ProductCard(props) {
  return (
    <Card className= "ProductCard shadow-lg rounded" style={{ width: '28rem' }} >
      <Card.Img variant="top" src={props.image} alt={props.title}/>
      <Card.Body className='ProductCard-Body'>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Button className='ProductCard-Button'>{props.price}</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
