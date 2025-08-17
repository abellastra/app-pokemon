import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Navar from '../pages/navar';

const Rutas = () => {
  return (
    <BrowserRouter>
      <Navar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Rutas;
