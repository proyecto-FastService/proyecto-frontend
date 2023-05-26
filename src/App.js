import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './components/Navegationbar';
import Productos from './components/Productos';
import Carrito from './components/Carrito';
import { CartProvider } from './context/cartContext';
import Footer from './components/Footer';
import Pagar from './components/Pagar';
import PanelAdmin from './components/administrador/PanelAdmin';
import MesaCard from './components/administrador/MesaCard';
import ProductEditor from './components/administrador/ProductEditor';
import AdminNavegationbar from './components/administrador/AdminNavegationbar';
import './App.css';

function App() {
  const mesa = localStorage.getItem('mesa');

  return (
    <BrowserRouter>
      <CartProvider>
        {mesa === '0' ? <AdminNavegationbar /> : <Navbar />}
        <Routes>
          <Route path="/productos/:numeroMesa" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pagar" element={<Pagar />} />
          <Route path="/productos/0/*" element={<PanelAdmin />} />
          <Route path="/productos/0/:mesaId" element={<MesaCard />} />
          <Route path="/0/editar-productos" element={<ProductEditor />} />
        </Routes>
        {mesa !== '0' && <Footer />} {/* Renderizar el footer solo si mesa no es 0 */}
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

