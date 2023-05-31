import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import logo from '../img/logo.png';

const Home = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center container-card">
        <Card.Body>
          <Card.Title className="mb-4">
            Gracias por usar FastService
          </Card.Title>
          <div className="d-flex flex-column align-items-center">
            <img src={logo} alt="Logo" className="mb-4" style={{ width: '200px' }} />
            <Card.Text className="mb-0">¡Ya te echamos de menos!</Card.Text>
            <Card.Text className="mb-0">(Si quiere volver a usar nuestra App, escanee el código QR)</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;



