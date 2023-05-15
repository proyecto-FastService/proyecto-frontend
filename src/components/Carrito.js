import React, { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Carrito = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  console.log('Carrito:', cart);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const handleRemoveFromCart = (itemId) => {
    setShowDeleteModal(true);
    setItemIdToDelete(itemId);
  };

  const handleClearCart = () => {
    setShowClearModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setItemIdToDelete(null);
  };

  const handleCloseClearModal = () => {
    setShowClearModal(false);
  };

  const handleConfirmDelete = () => {
    if (itemIdToDelete) {
      removeFromCart(itemIdToDelete);
      setItemIdToDelete(null);
    }
    setShowDeleteModal(false);
  };

  const handleConfirmClearCart = () => {
    clearCart();
    setShowClearModal(false);
  };

  return (
    <div className='Body-Carrito'>
      <div className='d-flex justify-content-center'>
        <Card className="Card-Carrito w-50 mt-5">
          <Card.Header>
            <h1 className='text-center text-carrito-header'>Carrito</h1>
          </Card.Header>
          <Card.Body className='body-body-carrito'>
            {cart.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.title} {item.price}
                    <Button
                      className='Carrito-Button mx-2'
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Eliminar
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Card.Body>
          {cart.length > 0 && (
            <Card.Footer>
              <Button className='boton-borrar-carrito' onClick={handleClearCart}>
                Vaciar carrito
              </Button>
            </Card.Footer>
          )}
        </Card>
      </div>

      {/* Modal para confirmar la eliminación de un producto */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro que deseas eliminar este producto del carrito?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmar la eliminación de todos los productos */}
      <Modal show={showClearModal} onHide={handleCloseClearModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar todos los productos</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro que deseas vaciar el carrito?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClearModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmClearCart}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Carrito;

