import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Pokemones from '../pages/pokemones';
import Navar from '../pages/navar';
import Login from '../components/login';

const Rutas = () => {
  return (
    
    <BrowserRouter>
    <Navar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/pokemones' element={<Pokemones/>} /> 
      </Routes>
    </BrowserRouter>
  );
};
export default Rutas;
