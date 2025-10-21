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
  }, []);

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
          <div className='flex items-center mt-2 relative z-11 '>
            {userName && (
              <h1 className=' p-1 sm:text-3xl mr-4  bg-blue-200/30 rounded '>
                Bienvenido {userName.toUpperCase()}
              </h1>
            )}
            <img
              className={`w-[5vh] ${tema === 'oscuro' ? 'bg-[rgb(251,251,251)] m-2' : ''} `}
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
              src={menuSvg}
              alt='menu'
            />

            {openMenu && (
              <div
                className={`absolute top-full  right-0 p-3 shadow-lg rounded flex flex-col items-center   ${tema === 'claro'
                    ? 'bg-[rgb(243,236,236)] text-[rgb(0, 0, 0)] '
                    : 'bg-[rgb(0,0,0)]'
                  }`}
              >
                <button
                  onClick={alernarTema}
                  className={`max-w-[30vh]  p-4 py-2 rounded transition-colors duration-300 mb-3 ${tema === 'claro'
                      ? 'bg-[rgb(0,0,0)] text-[rgb(199,234,227)]'
                      : 'bg-[rgb(243,236,236)] '
                    }`}
                >
                  Cambiar tema
                </button>
                <button className={`max-w-[30vh]  p-4 py-2  bg-blue-200/30 hover:bg-blue-300/50 rounded mb-3 ${tema === 'oscuro'
                    ? 'bg-[rgb(0,0,0)] text-[rgb(199,234,227)]'
                    : 'bg-[rgb(243,236,236)] '
                  }`}>
                  configuracion
                </button>

                <CerrarSesion />
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}
