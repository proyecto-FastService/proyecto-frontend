import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/cartContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Pagar = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const token = localStorage.getItem('token');
  const [productosNoPagados, setProductosNoPagados] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [email, setEmail] = useState('');
  const [showFacturaModal, setShowFacturaModal] = useState(false);
  const [cif, setCif] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [emailFactura, setEmailFactura] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/devolverProductosPedidosNoPagados/${token}`);
        setProductosNoPagados(response.data.productosNoPagados);

        const total = response.data.productosNoPagados.reduce((accumulator, producto) => {
          return accumulator + parseFloat(producto.precio);
        }, 0);
        setPrecioTotal(total);

        console.log(productosNoPagados);
        console.log(precioTotal);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const handleAbrirModalFactura = () => {
    setShowFacturaModal(true);
  };

  const handleCerrarModalFactura = () => {
    setShowFacturaModal(false);
  };

  const handleEnviarFactura = async () => {
    // Validar los campos de la factura antes de enviarlos

    try {
      const facturaData = {
        cif,
        nombreEmpresa,
        emailFactura
      };

      const url = `http://127.0.0.1:8000/api/envioCorreo/${token}/${emailFactura}`;

      await axios.post(url, facturaData);

      clearCart();
      localStorage.clear();
      Swal.fire('¡Pago exitoso!', 'El pago se ha realizado correctamente', 'success');
      await axios.post(`http://127.0.0.1:8000/api/envioFactura/${token}/${emailFactura}`, facturaData);
      await axios.get(`http://127.0.0.1:8000/api/pagarCarrito/${token}`);

      // Aquí puedes agregar el código adicional para manejar la respuesta de la API después de hacer la solicitud
    } catch (error) {
      // Aquí puedes manejar los errores en caso de que ocurra alguno durante la solicitud
    }
  };

  const handlePagarCarrito = async () => {
    try {
      if (productosNoPagados.length === 0) {
        Swal.fire('Recibo vacío', 'No hay productos pendientes de pago', 'warning');
        return;
      }

      const { value: facturaOption } = await Swal.fire({
        title: '¿Deseas recibir factura?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      });

      if (facturaOption) {
        handleAbrirModalFactura();
      } else {
        const { value: inputEmail } = await Swal.fire({
          title: 'Ingrese su correo electrónico',
          input: 'email',
          inputLabel: 'Correo electrónico',
          inputPlaceholder: 'Ingrese su correo electrónico para recibir el ticket',
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          inputValidator: (value) => {
            if (!value) {
              return 'Debe ingresar un correo electrónico';
            }
          },
        });

        if (inputEmail) {
          setEmail(inputEmail);
          const url = `http://127.0.0.1:8000/api/envioCorreo/${token}/${inputEmail}`;
          await axios.get(url);

          clearCart();
          localStorage.clear();
          Swal.fire('¡Pago exitoso!', 'El pago se ha realizado correctamente', 'success');
          await axios.get(`http://127.0.0.1:8000/api/pagarCarrito/${token}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='Body-Carrito d-flex flex-column flex-grow-1 pb-5'>
      <div className='d-flex justify-content-center '>
        <Card className="Card-Carrito w-50 mt-5 container-card">
          <Card.Header>
            <h2 className='text-center text-carrito-header'>Productos pendientes de pago:</h2>
          </Card.Header>
          <Card.Body className='body-body-carrito'>
            <div>
              <ul>
                {productosNoPagados.map((producto) => (
                  <li key={producto.id}>
                    {producto.nombre} - {producto.precio}€
                  </li>
                ))}
              </ul>
            </div>
          </Card.Body>
          <h4>Precio total: {precioTotal} €</h4>
          <div className='botones'>
            <button className="btn btn-warning btn-md" onClick={handlePagarCarrito}>Pagar</button>
          </div>
        </Card>
      </div>
      {showFacturaModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Factura</h3>
            <Form>
              <Form.Group controlId="formCif">
                <Form.Label>CIF</Form.Label>
                <Form.Control type="text" value={cif} onChange={(e) => setCif(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formNombreEmpresa">
                <Form.Label>Nombre de la empresa</Form.Label>
                <Form.Control type="text" value={nombreEmpresa} onChange={(e) => setNombreEmpresa(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formEmailFactura">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" value={emailFactura} onChange={(e) => setEmailFactura(e.target.value)} />
              </Form.Group>
              <Button variant="primary" onClick={handleEnviarFactura}>
                Enviar Factura
              </Button>
              <Button variant="secondary" onClick={handleCerrarModalFactura}>
                Cerrar
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pagar;