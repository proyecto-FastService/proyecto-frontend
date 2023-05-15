import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navegationbar';
import Productos from './components/Productos';
import Carrito from './components/Carrito';
import { CartProvider } from './context/cartContext'; // importamos el CartProvider desde el archivo CartContext
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <CartProvider> {/* Envuelve los componentes en el CartProvider */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
        <Footer />
      </CartProvider> {/* Cierra el CartProvider */}
    </BrowserRouter>
  );
}

export default App;



