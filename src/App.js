import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import GhostNavBar from './components/GhosNavBar';
import './App.css';
import fastServiceLogo from './img/logo-fondo-blanco.png';
import ProductListBebida from './components/ProductListBebida';
import ProductListPostre from './components/ProductListPostre';
import Home from './components/Home';
import Tunante from './components/Tunante';

function App() {
  const [loading, setLoading] = useState(true);
  const [mesa, setMesa] = useState(localStorage.getItem('mesa'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isHomePage, setIsHomePage] = useState(false);
  const [rendered, setRendered] = useState(false); // Estado para controlar si los componentes se han renderizado

  useEffect(() => {
    // Simula una carga de datos o procesamiento
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  
    const interval = setInterval(() => {
      const updatedMesa = localStorage.getItem('mesa');
      const updatedToken = localStorage.getItem('token');
      setMesa(updatedMesa);
      setToken(updatedToken);
    }, 2000);
  
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);
  

  useEffect(() => {
    setIsHomePage(window.location.pathname === '/');
  }, []);


  useEffect(() => {
    // Marcar los componentes como renderizados
    if (mesa && token) {
      setRendered(true);
    }
  }, [mesa, token]);

  if (loading) {
    return (
      <div className="loader-container">
        <img src={fastServiceLogo} alt="FastService Logo" className="logo-loader" />
      </div>
    );
  }

  if (window.location.pathname === '/') {
    return <GhostNavBar />;
  }

  if (window.location.pathname === '/tunante') {
    return <Tunante />;
  }

  return (
    <BrowserRouter>
      <CartProvider>
        {!isHomePage && (mesa === '0' ? <AdminNavegationbar /> : <Navbar />)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos/:numeroMesa" element={<Productos />} />
          <Route path="/bebidas/:numeroMesa" element={<ProductListBebida />} />
          <Route path="/postres/:numeroMesa" element={<ProductListPostre />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pagar" element={<Pagar />} />
          <Route path="/productos/admin/:numeroMesa/*" element={<PanelAdmin />} />
          <Route path="/productos/admin/:numeroMesa/:mesaId" element={<MesaCard />} />
          <Route path="/:numeroMesa/admin/editar-productos" element={<ProductEditor />} />
        </Routes>
        {mesa !== '0' && !isHomePage && <Footer />} {/* Renderizar el footer solo si mesa no es 0 y no estamos en la página de inicio */}
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
