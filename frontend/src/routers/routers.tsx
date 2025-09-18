import {  Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Navar from '../pages/navar';
import Login from '../components/login';
import { AuthPrivider } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
const Rutas = () => {

      const location = useLocation();
  
      const islogin = location.pathname === '/login';
  return (
      <AuthPrivider>
        <Navar ocultarbotones={islogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthPrivider>
  
  );
};
export default Rutas;
