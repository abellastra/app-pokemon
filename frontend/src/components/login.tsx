import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Modal from './modal';
import { useState } from 'react';

import FormularioDeRegistro from './registro';
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
  const [registroActivo, setRegistroActivo] = useState<boolean>(false);
  const [mensajeGeneral, setMensajeGeneral] = useState<string | null>(null);

  const navegar = useNavigate();
  const { setPerfil, setUserName } = useAuth();
  const { tema } = useTema();

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
    // PANTALLA LOGIN
    <div className=' flex flex-col items-center  bg-[linear-gradient(180deg,#B6CEEF_50%,#6095DB_100%)] relative w-screen  h-screen '>
      <div className='w-full h-[10vh] flex justify-between items-center pl-[10vh] pr-[10vh]'>
        <h1>logo</h1>
        <span>es_</span>
      </div>

      {/* // CONENEDOR FINAL LOG IN */}
      <div className=' z-10 bg-[#6095DB33] flex  justify-center  flex-row w-full h-full max-w-[707px] max-h-[766px] rounded-2xl'>
        {/* CONTENEDOR LOG IN */}
        <div className=' mt-[7vh] w-[539px]  max-h-[614px] flex  flex-col justify-between'>
          {/* FRAME21 */}
          <div className=' w-full max-h-[491px] flex justify-center flex-col items-center '>
            {/* FRAME20 */}
            <div className='flex justify-center  flex-col w-fit max-h-[150px] mt-[2vh]'>
              {/* FRAMA 18 */}
              <div
                className={` flex justify-center  items-center flex-col text-white w-[385px]  max-h-[115px]`}
              >
                <h1 className='font-semibold w-[80%] h-[6vh]  text-[30px] '>
                  Bienvenido de nuevo!
                </h1>
                <h2 className='text-[30px]'>Registro</h2>
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
                className={`w-[588px] mt-[5vh]  mb-[5vh] px-4 py-2  rounded-lg border border-[#00000033] border-[2px] outline-none`}
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
                placeholder='Contraseña'
                className={`w-full  mb-[5vh] px-4 py-2  rounded-lg border-[#00000033] outline-none  border-[2px] placeholder-gray-500}`}
              />
              {errors.password && <p>{errors.password.message}</p>}

              <button
                type='submit'
                className='w-[283px] py-2 bg-[#1261CA] rounded-xl mt-2'
              >
                Iniciar sesión
              </button>
            </form>
          </div>
          {/* FIGMA 17 */}
          <div className='button-[0px] flex justify-between max-w-[80vh] h-[4vh]  text-[20px]'>
            <button className='ml-[10vh] text-white '>no tenes cuenta?</button>
            <button
           onClick={() => setRegistroActivo(true)}

              className='mr-[10vh] text-[#0D458F] '
            >
              {' '}
              Iniciar{' '}
            </button>
          </div>
          {mensajeGeneral && (
            <p className='text-red-700 flex justify-center mt-1'>
              {mensajeGeneral}
            </p>
          )}
           {registroActivo && (
              <Modal estado={registroActivo} cambiarEstado={setRegistroActivo}>
                <FormularioDeRegistro cerrar={() => setRegistroActivo(false)} />
              </Modal>
            )}
        </div>
      </div>
      {/* ECLIPSE */}
      <div className=' w-[15vw] h-[15vw] top-[20vh] left-[180vh] rounded-full bg-[#0D458F]/40 blur-3xl absolute'></div>
      {/* GRAD 3 */}
      <div className='z-0 absolute w-[15vw] h-[15vw]  rounded-full top-[45vh] left-[120vh] bg-[#0D458F]/40 blur-3xl'></div>
      {/* GRAD 2 */}
      <div className=' absolute w-[15vw] h-[15vw]  rounded-full top-[5vh] left-[50vh] bg-[#0D458F]/40 blur-3xl'></div>
      {/* GRAD1 */}
      <div className=' absolute w-[15vw] h-[15vw]  rounded-full top-[60vh] left-[-15vh] bg-[#0D458F]/40 blur-3xl'></div>
    </div>
    // <>
    //   <div className='flex justify-center items-center flex-col'>
    //     <div
    //       className={` ${tema === 'oscuro' ? 'bg-[rgb(151,151,159)]' : ''} `}
    //     >
    //       <div className=' px-8 py-10 rounded-md max-w-md  mx-auto'>
    //         <h2 className={` ${tema === 'oscuro' ? 'text-white' : ''}  `}>
    //           Iniciar sesión{' '}
    //         </h2>
    //         <form
    //           className='w-full max-w-sm space-y-4'
    //           onSubmit={handleSubmit(preguntarSiEsUsuario)}
    //         >
    //           <input
    //             {...register('email', {
    //               required: 'El email es obligatorio',
    //               pattern: {
    //                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    //                 message: 'Debe tener formato valido: ejemplo@dominio.com',
    //               },
    //             })}
    //             placeholder='Email'
    //             className={`w-full px-4 py-2 rounded border-gray-600 outline-none text-blue-950 border placeholder-gray-500 ${tema === 'oscuro' ? 'placeholder-white' : ''}`}
    //           />
    //           {errors.email && <p>{errors.email.message}</p>}
    //           <input
    //             type='password'
    //             {...register('password', {
    //               required: 'La contraseña es obligatoria',
    //               minLength: {
    //                 value: 6,
    //                 message: 'La contraseña debe tener al menos 6 caracteres',
    //               },
    //             })}
    //             placeholder='Contraseña'
    //             className={`w-full px-4 py-2 rounded border-gray-600 outline-none text-blue-950 border placeholder-gray-500 ${tema === 'oscuro' ? 'placeholder-white' : ''}`}
    //           />
    //           {errors.password && <p>{errors.password.message}</p>}

    //           <button
    //             type='submit'
    //             className='w-full py-2 bg-blue-200/30 hover:bg-blue-200/50 rounded mt-2'
    //           >
    //             Iniciar sesión
    //           </button>
    //         </form>
    //         {mensajeGeneral && (
    //           <p className='text-red-700 flex justify-center mt-1'>
    //             {mensajeGeneral}
    //           </p>
    //         )}
    //       </div>
    //       <div className=' flex justify-center items-centers'>
    //         <p>Todavia no estas registrado?</p>
    //         <button
    //           onClick={() => setRegistroActivo(true)}
    //           className=' py-2 bg-blue-200/30 hover:bg-blue-200/50 rounded mt-2'
    //         >
    //           Registrarme
    //         </button>

    //         {registroActivo && (
    //           <Modal estado={registroActivo} cambiarEstado={setRegistroActivo}>
    //             <FormularioDeRegistro cerrar={() => setRegistroActivo(false)} />
    //           </Modal>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default Login;
