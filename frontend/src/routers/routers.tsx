import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Pokemones from '../pages/pokemones';
import Navar from '../pages/navar';

const Rutas = () => {
  return (
    <BrowserRouter>
    <Navar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokemon/:name' element={<Home />} />
         <Route path='/pokemones' element={<Pokemones/>} /> 
      </Routes>
    </BrowserRouter>
  );
};
export default Rutas;
