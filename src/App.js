import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './components/Navegationbar';
import Productos from './components/Productos';
import Carrito from './components/Carrito';
import { CartProvider } from './context/cartContext';
import './App.css';
import Footer from './components/Footer';
import Pagar from './components/Pagar';
import PanelAdmin from './components/administrador/PanelAdmin';
import Mesa1 from './components/administrador/Mesa1';
import Mesa2 from './components/administrador/Mesa2';
import Mesa3 from './components/administrador/Mesa3';
import PedidoDetalles from './components/administrador/PedidoDetalles';
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/productos/:numeroMesa" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pagar" element={<Pagar />} />
          <Route path="/productos/0/*" element={<PanelAdmin />} />
          <Route path="/productos/0/mesa1" element={<Mesa1 />} />
          <Route path="/productos/0/mesa2" element={<Mesa2 />} />
          <Route path="/productos/0/mesa3" element={<Mesa3 />} />
          <Route path="/productos/0/pedido-detalles/:mesaId" element={<PedidoDetalles />} />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;






