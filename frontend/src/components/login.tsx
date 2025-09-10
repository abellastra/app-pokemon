import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from "./modal";
import { useState } from "react";
import FormularioDeRegistro from "./registro";
type formData = {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<formData>()
    const [registroActivo, setRegistroActivo] = useState<boolean>(false)

    const navegar = useNavigate();

    async function preguntarSiEsUsuario(data: formData) {
        try {
            const respuesta = await fetch(`http://localhost:3000/login-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
                credentials:'include'
            });

            const resultado = await respuesta.json();
            if (!resultado.ok) {
                throw new Error("No se encontro un usuario");
            } else {
                navegar("/");
            }
        } catch (error) {
            console.log("OOops algo ocurrio", error)
        }
    }

    return (
      <div
        className='flex justify-center  flex-col
 '
      >
        <div className=' px-8 py-10 rounded-md max-w-md w-full mx-auto'>
          <h2 className='text-white'>Iniciar sesión </h2>
          <form
            className='w-full max-w-sm space-y-4'
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
              className='w-full px-4 py-2 rounded border-gray-600 outline-none text-blue-950 border placeholder-gray-500'
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
              className='w-full px-4 py-2 rounded border-gray-600 mt-2 outline-none   text-blue-950 border placeholder-gray-500'
            />
            {errors.password && <p>{errors.password.message}</p>}

            <button
              type='submit'
              className='w-full py-2 bg-blue-200/30 hover:bg-blue-200/50 rounded mt-2'
            >
              Iniciar sesión
            </button>
          </form>
        </div>
        <div className=" flex justify-center items-centers">
          <p>Todavia no estas registrado?</p>
          <button
            onClick={() => setRegistroActivo(true)}
            className=' py-2 bg-blue-200/30 hover:bg-blue-200/50 rounded mt-2'
          >
            Registrarme
          </button>

          {registroActivo && (
            <Modal estado={registroActivo} cambiarEstado={setRegistroActivo}>
              <FormularioDeRegistro cerrar={() => setRegistroActivo(false)} />
            </Modal>
          )}
        </div>
      </div>
    );
}

export default Login;