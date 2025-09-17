import { useNavigate, useLocation } from 'react-router-dom';
import { hayPerfil } from '../services/perfil';
import { useEffect, useState } from 'react';
import { CerrarSesion } from '../components/botonCerrarSesion';

import { useAuth } from '../context/AuthContext';
export default function Navar({ ocultarbotones }: { ocultarbotones: boolean }) {
  const navigate = useNavigate();
  const { perfil, setPerfil } = useAuth();
       const token = localStorage.getItem('token');
       console.log(token);
  console.log(perfil);
  useEffect(() => {
    const obtenerPefil = async () => {
      const res = await hayPerfil();
      console.log(res);
      setPerfil(res);
    };
    obtenerPefil();
  }, []);

  return (
    <header className='flex justify-center sm:justify-between item-center text-center  '>
      <h1
        onClick={() => {
          navigate('/');
        }}
        className='pt-2 radient-to-b from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent font-bold text-3xl sm:text-4xl '
      >
        Pokemones
      </h1>

      {!ocultarbotones && perfil === false && (
        <div className='item-center'>
          <button
            onClick={() => navigate('/login')}
            className='p-1 m-2 bg-sky-200 hover:bg-sky-300 sm:text-xl border-1 border-white rounded rounded-xl '
          >
            Sig in
          </button>
        </div>
      )}

      {!ocultarbotones && perfil && (
        <>
          <div className='flex items-center mt-2 '>
            <h1 className=' p-1 sm:text-3xl mr-4  bg-blue-200/30 rounded '>
              Bienvenido user
            </h1>
            <CerrarSesion />
          </div>
        </>
      )}
    </header>
  );
}
