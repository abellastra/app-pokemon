import { useNavigate, useLocation } from 'react-router-dom';
import { hayPerfil } from '../services/perfil';
import { useEffect, useState } from 'react';
import { CerrarSesion } from '../components/botonCerrarSesion';
import Login from '../components/login';
import { obtenerLike } from '../services/obtenerLike';
export default function Navar() {
  const navigate = useNavigate();
  const [pefil, setPerfil] = useState<boolean | null>(false);
  const [cerrarSesion, setCerrarSesion] = useState();
    const location = useLocation();

    const islogin = location.pathname === '/login';
 console.log(pefil)

  useEffect(() => {
    const obtenerPefil = async () => {
      const res = await hayPerfil();
      console.log(res)
      setPerfil(res);
    };
    obtenerPefil()
  },[]);


  return (
    <header className='flex justify-between item-center text-center  '>
      <h1
        onClick={() => {
          navigate('/');
        }}
        className='sm:ml-[10vh] bg-gradient-to-b from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent font-bold text-3xl sm:text-4xl '
      >
        Pokemones
      </h1>

      {!islogin && pefil === false && (
        <div className='item-center'>
          <button
            onClick={() => navigate('/login')}
            className='p-1 m-2 bg-sky-200 hover:bg-sky-300 sm:text-xl border-1 border-white rounded rounded-xl '
          >
            Sig in
          </button>
        </div>
      )}

      {!islogin && pefil && (
        <>
          <h1></h1>
          <CerrarSesion  />
        </>
      )}
    </header>
  );
}
