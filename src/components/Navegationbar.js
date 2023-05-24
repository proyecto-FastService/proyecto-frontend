import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CartContext } from '../context/cartContext';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../img/logo fondo blanco.png'; // Ruta de la imagen de tu logo
import '../App.css';

function Navegationbar() {
  const { cart, mesa } = useContext(CartContext);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar sticky-top">
      <Container>
        <Navbar.Brand as={NavLink} activeClassName="active-link" to={`/productos/${mesa}`}>
          <img src={logo} alt="Logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-toggler" style={{ backgroundColor: 'white' }} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="w-100">
            <Nav.Link as={NavLink} to={`/productos/${mesa}`} activeClassName="active-link">
              COMIDA
            </Nav.Link>
            <Nav.Link as={NavLink} to="/bebidas" activeClassName="active-link">
              BEBIDA
            </Nav.Link>
            <Nav.Link as={NavLink} to="/carrito" className="custom-cart" activeClassName="active-link">
              <span>CARRITO</span>
              {cartItemCount > 0 && <span className="cart-count">({cartItemCount})</span>}
              <FaShoppingCart style={{ marginLeft: '0.5rem' }} className="cart-icon text-ligthl" />
            </Nav.Link>
            <Nav.Link as={NavLink} to="/pagar" activeClassName="active-link" className='ms-lg-auto '>
              MI RECIBO
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegationbar;







// function Navegationbar() {
//   return (
//     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//       <Container>
//         <Navbar.Brand href="#">FASTSERVICE</Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="/productos">Productos</Nav.Link>
//             <Nav.Link href="/carrito">Carrito</Nav.Link>
//             <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//           <Nav>
//             <Nav.Link href="#deets">More deets</Nav.Link>
//             <Nav.Link eventKey={2} href="#memes">
//               Dank memes
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Navegationbar;