import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';


function ProductEditor() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [refresh, setRefresh] = useState(false); // Estado para refrescar el componente
  const [productos, setProductos] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    id: '',
    nombre: '',
    existencias: 0,
    precio: 0,
    descripcion: '',
    ingredientes: '',
    alergenos: '',
    imagen: null,
  });

  useEffect(() => {
    obtenerListadoProducto();
  }, [refresh]); // Agrega 'refresh' como dependencia del efecto

  const obtenerListadoProducto = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/admObtenerListadoProducto/${token}`);
      const data = response.data.productos;
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener el listado de productos:', error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditedProduct({
      id: product.id,
      nombre: product.nombre,
      existencias: product.existencias,
      precio: product.precio,
      descripcion: product.descripcion,
      ingredientes: product.ingredientes,
      alergenos: product.alergenos,
      imagen: null,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleAddProduct = () => {
    setEditedProduct({
      id: '',
      nombre: '',
      existencias: 0,
      precio: 0,
      descripcion: '',
      ingredientes: '',
      alergenos: '',
      imagen: null,
    });
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'imagen') {
      setEditedProduct({
        ...editedProduct,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setEditedProduct({
        ...editedProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nombre', editedProduct.nombre);
      formData.append('existencias', editedProduct.existencias);
      formData.append('precio', editedProduct.precio);
      formData.append('descripcion', editedProduct.descripcion);
      formData.append('ingredientes', editedProduct.ingredientes);
      formData.append('alergenos', editedProduct.alergenos);
      formData.append('imagen', editedProduct.imagen);

      await axios.post(
        `http://127.0.0.1:8000/api/admEditarProducto/${token}/${selectedProduct.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setShowEditModal(false);

      obtenerListadoProducto();
    } catch (error) {
      console.error('Error al guardar los cambios del producto:', error);
    }
  };

  const handleAddNewProduct = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nombre', editedProduct.nombre);
      formData.append('existencias', editedProduct.existencias);
      formData.append('precio', editedProduct.precio);
      formData.append('descripcion', editedProduct.descripcion);
      formData.append('ingredientes', editedProduct.ingredientes);
      formData.append('alergenos', editedProduct.alergenos);
      formData.append('imagen', editedProduct.imagen);
      formData.append('categoria', editedProduct.categoria);

      await axios.post(`http://127.0.0.1:8000/api/admAddProducto/${token}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowAddModal(false);

      obtenerListadoProducto();
    } catch (error) {
      console.error('Error al agregar el nuevo producto:', error);
    }
  };

  const handleOcultarProduct = async (idProducto) => {
    try {
      await axios.get(`http://127.0.0.1:8000/api/admOcultarProducto/${token}/${idProducto}`);
      setRefresh(!refresh);
      Swal.fire({
        icon: 'success',
        title: 'Producto ocultado',
        text: 'El producto se ha ocultado correctamente.',
      });
      // Realizar cualquier lógica adicional que necesites después de ocultar el producto
    } catch (error) {
      console.error('Error al ocultar el producto:', error);
    }
  };

  const validateForm = () => {
    if (!editedProduct.nombre || !editedProduct.existencias || !editedProduct.precio) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos deben ser completados',
      });
      return false;
    }

    return true;
  };

  return (
    <div className='container-card card'>
      <h1>Editor de Productos</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Existencias</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((product) => (
            <tr key={product.id}>
              <td>{product.nombre}</td>
              <td>{product.existencias}</td>
              <td>{product.precio}</td>
              <td>
                <Button className='custom-button' variant="primary" onClick={() => handleEditProduct(product)}>
                  Editar
                </Button>
                <Button className='custom-button' variant="secondary" onClick={() => handleOcultarProduct(product.id)}>
                  Ocultar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button className='custom-button' variant="success" onClick={handleAddProduct}>
        Añadir
      </Button>

      {/* Modal de Edición */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={editedProduct.nombre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Existencias</Form.Label>
              <Form.Control
                type="number"
                name="existencias"
                value={editedProduct.existencias}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={editedProduct.precio}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={editedProduct.descripcion}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ingredientes</Form.Label>
              <Form.Control
                as="textarea"
                name="ingredientes"
                value={editedProduct.ingredientes}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Alergenos</Form.Label>
              <Form.Control
                as="textarea"
                name="alergenos"
                value={editedProduct.alergenos}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" name="imagen" onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Agregar */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={editedProduct.nombre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Existencias</Form.Label>
              <Form.Control
                type="number"
                name="existencias"
                value={editedProduct.existencias}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={editedProduct.precio}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={editedProduct.descripcion}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ingredientes</Form.Label>
              <Form.Control
                as="textarea"
                name="ingredientes"
                value={editedProduct.ingredientes}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Alergenos</Form.Label>
              <Form.Control
                as="textarea"
                name="alergenos"
                value={editedProduct.alergenos}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="textarea"
                name="categoria"
                value={editedProduct.categoria}
                onChange={handleInputChange}
              />
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" name="imagen" onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddNewProduct}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductEditor;
