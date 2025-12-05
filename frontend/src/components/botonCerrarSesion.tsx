import { useNavigate } from 'react-router-dom';
import Modal from './modal';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from "react-i18next"


export const CerrarSesion = () => {
  const { perfil, setPerfil } = useAuth();
  const { t } = useTranslation();

  console.log(perfil);
  const navegar = useNavigate();
  const [modalActivo, setModaActivo] = useState<boolean>(false);
  const logOut = async () => {
    console.log('logout');
    const respuesta = await fetch('http://localhost:3000/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!respuesta) {
      throw new Error('Ocurrio un problema al cerrar la sesion');
    }
    const resultado = await respuesta.json();
    if (resultado.ok) {
      localStorage.removeItem('userName');
      navegar('/login');
      setPerfil(false);
    }
  };
  return (
    <>
      {modalActivo && (
        <Modal estado={modalActivo} cambiarEstado={setModaActivo}>
          <div className=''>
            <p>{t("¿Seguro quieres cerrar sesion?")}</p>
            <button
              className=' w-full py-2 bg-blue-200/30 hover:bg-blue-300/50 rounded mt-2'
              onClick={logOut}
            >
              {t("Aceptar")}
            </button>
          </div>
        </Modal>
      )}
      <button
        className={`flex items-center justify-start w-full max-w-[200px] px-4 py-2 whitespace-nowrap hover:cursor-pointer`}
        onClick={() => setModaActivo(true)}
      >
        {t("Cerrar sesion")}
      </button>
    </>
  );
};