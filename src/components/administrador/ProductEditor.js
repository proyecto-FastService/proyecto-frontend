import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

function ProductEditor() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
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
  }, []);

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
    try {
      const formData = new FormData();
      formData.append('nombre', editedProduct.nombre);
      formData.append('existencias', editedProduct.existencias);
      formData.append('precio', editedProduct.precio);
      formData.append('descripcion', editedProduct.descripcion);
      formData.append('ingredientes', editedProduct.ingredientes);
      formData.append('alergenos', editedProduct.alergenos);
      formData.append('imagen', editedProduct.imagen);

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

  return (
    <div className='ProductCard card'>
      <h1>Editor de Productos</h1>
      
      <table>
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
                <Button variant="primary" onClick={() => handleEditProduct(product)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={editedProduct.nombre} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formExistencias">
              <Form.Label>Existencias</Form.Label>
              <Form.Control type="number" name="existencias" value={editedProduct.existencias} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="precio" value={editedProduct.precio} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" name="descripcion" value={editedProduct.descripcion} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formIngredientes">
              <Form.Label>Ingredientes</Form.Label>
              <Form.Control as="textarea" name="ingredientes" value={editedProduct.ingredientes} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formAlergenos">
              <Form.Label>Alergenos</Form.Label>
              <Form.Control as="textarea" name="alergenos" value={editedProduct.alergenos} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formImagen">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" name="imagen" onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={editedProduct.nombre} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formExistencias">
              <Form.Label>Existencias</Form.Label>
              <Form.Control type="number" name="existencias" value={editedProduct.existencias} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="precio" value={editedProduct.precio} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" name="descripcion" value={editedProduct.descripcion} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formIngredientes">
              <Form.Label>Ingredientes</Form.Label>
              <Form.Control as="textarea" name="ingredientes" value={editedProduct.ingredientes} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formAlergenos">
              <Form.Label>Alergenos</Form.Label>
              <Form.Control as="textarea" name="alergenos" value={editedProduct.alergenos} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formImagen">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" name="imagen" onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Añadir Producto
          </Button>
        </Modal.Footer>
      </Modal>

      <button onClick={handleAddProduct}>Añadir Producto</button>

    </div>
  );
}

export default ProductEditor;
