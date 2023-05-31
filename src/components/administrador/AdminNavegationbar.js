import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { CartContext } from '../../context/cartContext';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../../img/logo-fondo-blanco.png'; // Ruta de la imagen de tu logo
import '../../App.css';

function AdminNavegationbar() {
  const { cart, mesa } = useContext(CartContext);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar ">
      <Container>
        <Navbar.Brand as={NavLink}  to={`/productos/${mesa}`}>
          <img src={logo} alt="Logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-toggler" style={{ backgroundColor: 'white' }} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <NavLink to={`/productos/${mesa}`} className="nav-link"  style={{ marginRight:'10px' }}>
              MESAS
          </NavLink>
          <Nav.Link as={NavLink} to="/0/editar-productos"  >
            EDITOR DE PRODUCTOS
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavegationbar;
