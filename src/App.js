import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navegationbar';
import Inicio from './components/Inicio';
import Comida from './components/Comida';
import Productos from './components/Comida';
import Carrito from './components/Carrito';


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/Comida" element={<Comida />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



