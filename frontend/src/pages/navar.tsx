import { useNavigate } from 'react-router-dom';
import { hayPerfil } from '../services/perfil';
import { useEffect, useState } from 'react';
import { CerrarSesion } from '../components/botonCerrarSesion';
import { useTema } from '../context/temaContext';
import { useAuth } from '../context/AuthContext';


import menuSvg from '../assets/Bullet-List--Streamline-Plump.png';


export default function Navar({ ocultarbotones }: { ocultarbotones: boolean }) {
  const navigate = useNavigate();
  const { perfil, setPerfil } = useAuth();
  const { userName } = useAuth();

  const { tema, setTema } = useTema();
  const [openMenu, setOpenMenu] = useState(false);


  useEffect(() => {
    const obtenerPefil = async () => {
      const res = await hayPerfil();
      setPerfil(res);
    };
    obtenerPefil();
  }, [setPerfil]);

  const alernarTema = () => {
    console.log(tema);
    setTema(tema === 'claro' ? 'oscuro' : 'claro');
  };
  return (
    <header className='flex justify-center sm:justify-between item-center text-center  '>
      <h1
        onClick={() => {
          navigate('/');
        }}
        className='pt-2 bg-gradient-to-b from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent font-bold text-3xl sm:text-4xl '
      >
        Pokemones
      </h1>

      {!ocultarbotones && perfil === false && (
        <div className='item-center'>
          <button
            onClick={() => navigate('/login')}
            className='p-1 m-2 bg-sky-200 hover:bg-sky-300 sm:text-xl border-1 border-white  rounded-xl '
          >
            Sig in
          </button>
        </div>
      )}

      {!ocultarbotones && perfil && (
        <>
          <div className="flex items-center mt-2 relative z-10">
            {userName && (
              <h1 className="p-1 sm:text-3xl mr-4 bg-blue-200/30 rounded">
                Bienvenido {userName.toUpperCase()}
              </h1>
            )}
            <img
              className={`w-[5vh] ${openMenu ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${tema === 'oscuro' ? 'bg-[rgb(251,251,251)] m-2' : ''}`}
              onClick={() => {
                if (!openMenu) setOpenMenu(true);
              }}
              src={menuSvg}
              alt="menu"
            />

          </div>

          {openMenu && (
            <div className={`fixed top-0 left-0 w-[200px] h-full z-50 bg-[#B6CEEF] shadow-lg p-[4px] `}>
              <button
                onClick={() => setOpenMenu(false)}
                className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-red-500"
              >
                x
              </button>

              <nav className='flex flex-col w-[152px] h-[276px] p-[28px] gap-[4px]'>
                <button
                  onClick={alernarTema}
                  className='flex items-center justify-start w-full  px-4 py-2 whitespace-nowrap hover:cursor-pointer '
                >
                  Cambiar modo
                </button>
                <button className='flex items-center justify-start w-full max-w-[200px] px-4 py-2 whitespace-nowrap hover:cursor-pointer'>
                  Configuracion
                </button>

                <button className='flex items-center justify-start w-full max-w-[200px] px-4 py-2 whitespace-nowrap hover:cursor-pointer'>
                  Favoritos
                </button>

                <CerrarSesion />
              </nav>
            </div>
          )}

        </>
      )}
    </header>
  );
}
