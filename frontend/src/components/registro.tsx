import { useForm } from "react-hook-form";
import { crearSolicitudUsuario } from "../services/usert";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTema } from "../context/temaContext";
import logoPikachu from '../assets/logo-pikachu.png';
type formData = {
  userName: string
  email: string;
  password: string;
  confirmPassword: string;
}
type user = {
  userName: string,
  password: string;
  email: string;
}

export const FormularioDeRegistro = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<formData>()
  const [mensajeGeneral, setMensajeGeneral] = useState<string | null>(null)
  const { t, i18n } = useTranslation()
  const { tema } = useTema();
  const navigate = useNavigate()
  const crearUsuario = async (datos: user) => {
    try {
      await crearSolicitudUsuario(datos)
      toast.success("¡El registro fue exitoso!", { duration: 4000 });
      navigate('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMensajeGeneral(error.message)
      } else {
        setMensajeGeneral('Ocurrio un error desconocido.')
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
                <h1 className='font-semibold w-[80%] h-[6vh]  text-[30px] mb-[2vh]'>
                  {t("Bienvenido a PokéApp Regístrate")}
                </h1>

              </div>
            </div>
            <form
              className='flex flex-col justify-center items-center text-white'
              onSubmit={handleSubmit(crearUsuario)}
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
                className={`w-[90vw] mb-[5vh] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] mt-[5vh]   px-4 py-2  rounded-lg border-[#00000033] border-[2px] outline-none`}
              ></input>

              {errors.email && (
                <p className=' mt-[-5vh] mb-[5vh]'>{errors.email.message}</p>
              )}
              <input
                {...register('userName', {
                  required: 'El nombre de usuario es obligatorio',
                })}
                placeholder='ingrese nombre de usuario'
                className={`w-full  mb-[5vh] px-4 py-2  rounded-lg border-[#00000033] outline-none  border-[2px] placeholder-gray-500}`}
              />

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
                className={`w-full mb-[5vh] px-4 py-2  rounded-lg border-[#00000033] outline-none  border-[2px] placeholder-gray-500}`}
              />
              {errors.password && (
                <p className='mt-[-5vh] mb-[5vh]'>{errors.password.message}</p>
              )}
              <input
                {...register('confirmPassword', {
                  validate: match => {
                    const password = getValues('password');
                    return match === password || 'Passwords should match!';
                  },
                })}
                type='password'
                placeholder=' Confirm password'
                id='confirmPassword'
                autoComplete='off'
                className={`w-full mb-[5vh] px-4 py-2  rounded-lg border-[#00000033] outline-none  border-[2px] placeholder-gray-500}`}
              />
              {errors.confirmPassword && (
                <p className='mt-[-5vh] mb-[5vh]'>
                  {errors.confirmPassword.message}
                </p>
              )}

              {mensajeGeneral && (
                <p className='text-red-700'>{mensajeGeneral}</p>
              )}

              <button
                type='submit'
                className='w-[283px] py-2 bg-[#1261CA] rounded-xl mt-2'
              >
                {t("Crear cuenta")}
              </button>
            </form>
          </div>

          <div className='button-[0px] flex justify-between max-w-[80vh] h-[4vh]  text-[20px]'>
            <button
              onClick={() => {
                navigate('/login');
              }}
              className='ml-[10vh] text-white cursor-pointer'
            >
              {' '}
              {t("Iniciar Sesion")}{' '}
            </button>
          </div>

        </div>
      </div>

      <div className=' w-[15vw] h-[15vw] top-[20vh] left-[180vh] rounded-full bg-[#0D458F]/40 blur-3xl absolute'></div>

      <div className='z-0 absolute w-[15vw] h-[15vw]  rounded-full top-[45vh] left-[120vh] bg-[#0D458F]/40 blur-3xl'></div>

      <div className=' absolute w-[15vw] h-[15vw]  rounded-full top-[5vh] left-[50vh] bg-[#0D458F]/40 blur-3xl'></div>

      <div className=' absolute w-[15vw] h-[15vw]  rounded-full top-[60vh] left-[-15vh] bg-[#0D458F]/40 blur-3xl'></div>
    </div>
  );
}
