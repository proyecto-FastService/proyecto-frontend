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
import MesaCard from './components/administrador/MesaCard';
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
          <Route path="/productos/0/:mesaId" element={<MesaCard  />} />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;






