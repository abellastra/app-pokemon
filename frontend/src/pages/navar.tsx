import { useNavigate } from 'react-router-dom';
import { hayPerfil } from '../services/perfil';
import { useEffect, useState } from 'react';
import { CerrarSesion } from '../components/botonCerrarSesion';
import { useTema } from '../context/temaContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from "react-i18next"
import { IoMenu } from "react-icons/io5";
import logoPikachu from '../assets/logo-pikachu.png';


export default function Navar({ ocultarbotones }: { ocultarbotones: boolean }) {
  const { t,i18n } = useTranslation()
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
    <header className="relative flex justify-center items-center mb-12 h-[80px]">
      
      <h1
        onClick={() => {
          navigate('/');
        }}
        className="absolute left-1/2 transform -translate-x-1/2 font-bold text-3xl sm:text-4xl text-white cursor-pointer">
        <img src={logoPikachu} alt="Logo Pikachu" className="h-40" />
      </h1>
      
      <select className={`absolute right-12 top-2 border border-white rounded-md px-2 py-1 cursor-pointer ${tema === 'oscuro' ? 'text-white' : 'text-black'}`} value={i18n.resolvedLanguage || "es"}
        onChange={(e) => i18n.changeLanguage(e.target.value)}>
        <option value="es" className={`${tema === 'oscuro' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          ES
        </option>
        <option value="en" className={`${tema === 'oscuro' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          EN
        </option>
      </select>

      {!ocultarbotones && perfil === false && (
        <div className='fixed left-0 mt-2 mr-12'>
          <button
            onClick={() => navigate('/login')}
            className='p-1 m-2 bg-sky-200 hover:bg-sky-300 sm:text-xl border-1 border-white  rounded-xl '
          >
            {t("Iniciar Sesion")}
          </button>
        </div>
      )}

      {!ocultarbotones && perfil && (
        <>
          <div className="flex items-center mt-2 fixed top-0 left-0 z-50">
            {/* {userName && (
              <h1 className="p-1 sm:text-3xl mr-4 bg-blue-200/30 rounded">
                Bienvenido {userName.toUpperCase()}
              </h1>
            )} */}
            <div
              className={`w-[5vh] ml-12 ${openMenu ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${tema === 'oscuro' ? 'text-[rgb(251,251,251)] ' : ''}`}
              onClick={() => {
                if (!openMenu) setOpenMenu(true);
              }}>
              <IoMenu size={30} />
            </div>

          </div>

          {openMenu && (
            <div className={`fixed top-0 left-0 w-[200px] h-full z-50 bg-[#B6CEEF] shadow-lg p-[4px] `}>

              {userName && (
                <h1 className="p-1 sm:text-2xl mb-2 mt-4  text-center">
                  {t("Bienvenido")} {userName.toUpperCase()}
                </h1>
              )}
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
                  {t("Cambiar modo")}
                </button>
                <button className='flex items-center justify-start w-full max-w-[200px] px-4 py-2 whitespace-nowrap hover:cursor-pointer'>
                  {t("Configuracion")}
                </button>

                <button className='flex items-center justify-start w-full max-w-[200px] px-4 py-2 whitespace-nowrap hover:cursor-pointer'>
                  {t("Favoritos")}
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
