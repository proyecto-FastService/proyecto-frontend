import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navegationbar';
import NumberSender from './components/numberSender';
import Productos from './components/Productos';
import Carrito from './components/Carrito';


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<NumberSender />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



