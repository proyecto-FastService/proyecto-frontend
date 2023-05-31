import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const Home = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center container-card">
        <Card.Body>
          <Card.Title>Gracias por usar FastService</Card.Title>
          <Card.Text>¡Ya te echamos de menos!</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;


