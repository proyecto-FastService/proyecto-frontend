import React, { useContext, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CartContext } from '../context/cartContext';
import Modal from 'react-modal';
import { TiTickOutline } from 'react-icons/ti';

// Establece el elemento raíz para el modal
Modal.setAppElement('#root');

function ProductCard(props) {
  const { addToCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const handleClick = () => {
    addToCart({
      id: props.id,
      title: props.title,
      price: props.price,
      image: props.image,
      quantity: 1
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Configuración de animación con react-spring
  const animationProps = useSpring({
    opacity: showModal ? 1 : 0,
    transform: showModal ? 'translateY(0)' : 'translateY(-50%)',
    rotate: showModal ? '0deg' : '10deg',
    config: {
      tension: 50,
      friction: 8,
      mass: 0.5
    }
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <Card className="ProductCard shadow-lg rounded mx-auto" style={{ maxWidth: '28rem' }}>
        <Card.Img variant="top" src={props.image} alt={props.title} />
        <Card.Body className="ProductCard-Body">
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Button className="ProductCard-Button" onClick={handleClick}>
            {props.price}
          </Button>
        </Card.Body>
      </Card>

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Producto añadido al carrito"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid black'
          }
        }}
      >
        <animated.div style={animationProps}>
          <h2>Producto añadido al carrito</h2><TiTickOutline size={48} color="green" />
          <p>{props.title} se ha añadido al carrito.</p>
          <button onClick={closeModal}>Cerrar</button>
        </animated.div>
      </Modal>
    </div>
  );
}

export default ProductCard;






