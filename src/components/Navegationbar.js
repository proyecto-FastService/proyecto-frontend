import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CartContext } from '../context/cartContext';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../img/logo fondo blanco.png'; // Ruta de la imagen de tu logo
import '../App.css';
import { TbBellRingingFilled } from 'react-icons/tb';
import axios from 'axios';
import Swal from 'sweetalert2';


function Navegationbar() {
  const { cart, mesa } = useContext(CartContext);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLlamarCamarero = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.get(`http://127.0.0.1:8000/api/llamarCamarero/${token}`);
      Swal.fire({
        icon: 'success',
        title: 'Camarero llamado',
        text: 'En breves se acercará un camarero a su mesa',
      });
      // Aquí puedes agregar el código adicional para manejar la respuesta de la API después de hacer la llamada
    } catch (error) {
      // Aquí puedes manejar los errores en caso de que ocurra alguno durante la llamada
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar ">
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
            <Nav.Link as={NavLink} to={`/bebidas/${mesa}`} activeClassName="active-link">
              BEBIDA
            </Nav.Link>
            <Nav.Link as={NavLink} to={`/postres/${mesa}`} activeClassName="active-link">
              POSTRE
            </Nav.Link>
            <Nav.Link as={NavLink} to="/carrito" className="custom-cart" activeClassName="active-link">
              <span>CARRITO</span>
              {cartItemCount > 0 && <span className="cart-count">({cartItemCount})</span>}
              <FaShoppingCart style={{ marginLeft: '0.5rem' }} className="cart-icon text-ligthl" />
            </Nav.Link>
            <div className="d-flex align-items-center ms-auto">
              <Nav.Link as={NavLink} to="/pagar" activeClassName="active-link" className="custom-hover-mi-recibo">
                <button className="btn btn-light" style={{ marginRight: '0.5rem' }}>MI RECIBO</button>
              </Nav.Link>

              <div activeClassName="active-link" className="custom-hover-camarero">
                <button className="btn btn-danger" onClick={handleLlamarCamarero}>
                  <span className="hover-bell">
                    <TbBellRingingFilled className="bell-icon" style={{ marginRight: '0.5rem' }} />
                  </span>
                  CAMARERO
                </button>
              </div>
            </div>
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