import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from "react-i18next"
import logoPikachu from '../assets/logo-pikachu.png';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/temaContext';
type formData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const [mensajeGeneral, setMensajeGeneral] = useState<string | null>(null);

  const navegar = useNavigate();
  const { setPerfil, setUserName } = useAuth();
  const { t, i18n } = useTranslation()
  const { tema } = useTema();
  const navigate = useNavigate();

  async function preguntarSiEsUsuario(data: formData) {
    try {
      const respuesta = await fetch(`http://localhost:3000/login-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: 'include',
      });

      const resultado = await respuesta.json();

      if (!resultado.ok) {
        setMensajeGeneral(resultado.msg);
        return;
      }
      const name = resultado.data.name;
      localStorage.setItem('userName', name);
      setUserName(name);
      setMensajeGeneral('');
      setPerfil(true);
      navegar('/');
    } catch (error) {
      if (error instanceof Error) {
        setMensajeGeneral('No se pudo conectar con el servidor');
      }
    }
  }

  return (
    <div className=' flex flex-col items-center  bg-[linear-gradient(180deg,#B6CEEF_50%,#6095DB_100%)] relative w-screen  h-screen '>
      <div className='w-full h-[10vh] flex justify-between items-center pl-[10vh] pr-[10vh]'>
        <h1
          onClick={() => {
            navigate('/');
          }}
          className="h-10vh absolute left-1/2 transform -translate-x-1/2 font-bold text-3xl sm:text-4xl text-white cursor-pointer">
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
      </div>

      <div className=' z-10 bg-[#6095DB33] flex  justify-center  flex-row w-full h-full max-w-[707px] max-h-[766px] rounded-2xl'>
        <div className=' mt-[7vh] w-[539px]  max-h-[614px] flex  flex-col justify-between'>
          <div className=' w-full max-h-[491px] flex justify-center flex-col items-center '>
            <div className='flex justify-center  flex-col w-fit max-h-[150px] mt-[2vh]'>
              <div
                className={` flex justify-center  items-center flex-col text-white w-[385px]  max-h-[115px]`}
              >
                <h1 className='font-semibold w-[80%] h-[6vh]  text-[30px] '>
                  {t("Bienvenido de nuevo")}
                </h1>

              </div>
            </div>
            <form
              className='flex flex-col justify-center items-center text-white'
              onSubmit={handleSubmit(preguntarSiEsUsuario)}
            >
              <input
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Debe tener formato valido: ejemplo@dominio.com',
                  },
                })}
                placeholder='Email'
                className={`w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] mt-[5vh]  mb-[5vh] px-4 py-2  rounded-lg border-[#00000033] border-[2px] outline-none`}
              />
              {errors.email && <p>{errors.email.message}</p>}
              <input
                type='password'
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
                })}
                placeholder='Password'
                autoComplete='off'
                className={`w-full    mb-[5vh] px-4 py-2  rounded-lg border-[#00000033] outline-none  border-[2px] placeholder-gray-500}`}
              />
              {errors.password && <p>{errors.password.message}</p>}

              <button
                type='submit'
                className='w-[283px] py-2 bg-[#1261CA] rounded-xl mt-2 cursor-pointer'
              >
                {t("Iniciar Sesion")}
              </button>
            </form>
          </div>

          <div className='button-[0px] flex justify-between max-w-[80vh] h-[4vh]  text-[20px]'>
            <button
              className='ml-[10vh] text-white cursor-pointer '
              onClick={() => {
                navegar('/registro');
              }}
            >
              {t("no tenes cuenta?")}
            </button>
  
          </div>
          {mensajeGeneral && (
            <p className='text-red-700 flex justify-center mt-1'>
              {mensajeGeneral}
            </p>
          )}
        </div>
      </div>

      <div className=' w-[15vw] h-[15vw] top-[20vh] left-[180vh] rounded-full bg-[#0D458F]/40 blur-3xl absolute'></div>

      <div className='z-0 absolute w-[15vw] h-[15vw]  rounded-full top-[45vh] left-[120vh] bg-[#0D458F]/40 blur-3xl'></div>

      <div className=' absolute w-[15vw] h-[15vw]  rounded-full top-[5vh] left-[50vh] bg-[#0D458F]/40 blur-3xl'></div>

      <div className=' absolute w-[15vw] h-[15vw]  rounded-full top-[60vh] left-[-15vh] bg-[#0D458F]/40 blur-3xl'></div>
    </div>
  );
};

export default Login;
