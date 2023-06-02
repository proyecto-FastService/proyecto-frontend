import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/cartContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Pagar = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const token = localStorage.getItem('token');
  const [productosNoPagados, setProductosNoPagados] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://daw206.medacarena.es/public/api/devolverProductosPedidosNoPagados/${token}`);
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
        const { value: formValues } = await Swal.fire({
          title: 'Factura',
          html:
            '<input id="swal-input1" class="swal2-input-cif" placeholder="CIF">' +
            '<input id="swal-input2" class="swal2-input-cif" placeholder="Nombre de la empresa">',
          focusConfirm: false,
          preConfirm: () => {
            const cif = document.getElementById('swal-input1').value;
            const nombreEmpresa = document.getElementById('swal-input2').value;
          
            // CIF validation regex pattern
            const cifRegex = /^[ABCDEFGHJKLMNPQRSUVW]{1}\d{7}[0-9A-J]$/;
          
            if (!cif || !nombreEmpresa) {
              Swal.showValidationMessage('Debe completar todos los campos');
            } else if (!cifRegex.test(cif)) {
              Swal.showValidationMessage('Debe ingresar un CIF válido');
            }
          
            return [cif, nombreEmpresa];
          },
          
        });

        if (formValues) {
          const [cif, nombreEmpresa] = formValues;
          const { value: inputEmail } = await Swal.fire({
            title: 'Ingrese su correo electrónico para recibir la factura',
            input: 'email',
            inputLabel: '',
            inputPlaceholder: 'Correo electrónico',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
              if (!value) {
                return 'Debe ingresar un correo electrónico';
              }
          
              if (!/\S+@\S+\.\S+/.test(value)) {
                return 'Debe ingresar un correo electrónico válido';
              }
            },
          });

          if (inputEmail) {
            setEmail(inputEmail);
            const url = `https://daw206.medacarena.es/public/api/envioCorreo/${token}/${inputEmail}/${nombreEmpresa}/${cif}`;
            console.log(url);

            await axios.get(url);

            clearCart();
            localStorage.clear();
            Swal.fire('¡Pago exitoso!', 'El pago se ha realizado correctamente', 'success');
            await axios.get(`https://daw206.medacarena.es/public/api/pagarCarrito/${token}`);
            window.location.href = 'https://proyecto2.medacarena.es';
          }
        }
      } else {
        const { value: inputEmail } = await Swal.fire({
          title: 'Ingrese su correo electrónico para recibir el ticket',
          input: 'email',
          inputLabel: '',
          inputPlaceholder: 'Correo electrónico',
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          inputValidator: (value) => {
            if (!value) {
              return 'Debe ingresar un correo electrónico';
            }
        
            if (!/\S+@\S+\.\S+/.test(value)) {
              return 'Debe ingresar un correo electrónico válido';
            }
          },
        });
        

        if (inputEmail) {
          setEmail(inputEmail);
          const url = `https://daw206.medacarena.es/public/api/envioCorreo/${token}/${inputEmail}/null/null`;
          await axios.get(url);

          clearCart();
          localStorage.clear();

          Swal.fire('¡Pago exitoso!', 'El pago se ha realizado correctamente', 'success')
            .then(() => {
              axios.get(`https://daw206.medacarena.es/public/api/pagarCarrito/${token}`);
              window.location.href = 'https://proyecto2.medacarena.es';
            });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='Body-Carrito d-flex flex-column flex-grow-1 pb-5'>
      <div className='d-flex justify-content-center '>
        <Card className="Card-Carrito w-full mt-5 container-card">
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
    </div>
  );
}

export default Pagar;

