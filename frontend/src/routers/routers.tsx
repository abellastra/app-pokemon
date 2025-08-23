import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Pokemones from '../pages/pokemones';
import Navar from '../pages/navar';
import Filters from '../components/filters';
import Login from '../components/login';

const Rutas = () => {
  return (
    <BrowserRouter>
      <Navar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/pokemones' element={<Pokemones />} />
        <Route path='/pokemones/generation/:generation' element={<Filters />} />
        <Route path='/login' element={<Login />} /> {/*borra mas tarde */}
      </Routes>
    </BrowserRouter>
  );
};
export default Rutas;
