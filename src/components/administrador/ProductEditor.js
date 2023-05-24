import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

function ProductEditor() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        id: '',
        nombre: '',
        existencias: 0,
        precio: 0,
        descripcion: '',
        ingredientes: '',
        alergenos: '',
    });

    useEffect(() => {
        const obtenerListadoProducto = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/admObtenerListadoProducto/${token}`);
                const data = response.data.productos;
                setProductos(data);
            } catch (error) {
                console.error('Error al obtener el listado de productos:', error);
            }
        };

        obtenerListadoProducto();
    }, [token]);

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setEditedProduct({
            id: product.id,
            nombre: product.nombre,
            existencias: product.existencias,
            precio: product.precio,
            descripcion: product.descripcion,
            ingredientes: product.ingredientes,
            alergenos: product.alergenos
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        setEditedProduct({
            ...editedProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveChanges = async () => {
        try {
            await axios.post(
                `http://127.0.0.1:8000/api/admEditarProducto/${token}/${selectedProduct.id}`,
                editedProduct
            );
            // Realizar acciones adicionales si es necesario
            setShowModal(false);
        } catch (error) {
            console.error('Error al guardar los cambios del producto:', error);
        }
    };

    return (
        <div>
            <h1>Gestión de Productos</h1>
            <div>
                {productos.map((producto) => (
                    <div key={producto.id} className="card">
                        <h2>{producto.nombre}</h2>
                        <p>Existencias: {producto.existencias}</p>
                        <p>Precio: {producto.precio}</p>
                        <p>Descripción: {producto.descripcion}</p>
                        <p>Ingredientes: {producto.ingredientes}</p>
                        <p>Añergenos: {producto.alergenos}</p>
                        <button onClick={() => handleEditProduct(producto)}>Editar Producto</button>
                    </div>
                ))}
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
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
                        <Form.Group controlId="formPrecio">
                            <Form.Label>Alergenos</Form.Label>
                            <Form.Control type="number" name="alergenos" value={editedProduct.alergenos} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}



export default ProductEditor;

