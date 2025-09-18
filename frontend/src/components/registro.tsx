import { useForm } from "react-hook-form";
import { crearSolicitudUsuario } from "../services/usert";
import { useState } from "react";

type formData = {
    email: string;
    password: string;
    confirmPassword: string;
}
type user = {
    password: string;
    email: string;
}
type ModalProps = {
    cerrar: () => void
}
const FormularioDeRegistro = ({ cerrar }: ModalProps) => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<formData>()
    const [mensajeGeneral, setMensajeGeneral] = useState<string | null>(null)

    const crearUsuario = async (datos: user) => {
        try {
             await crearSolicitudUsuario(datos)
             cerrar()
        }catch(error: unknown){
            if(error instanceof Error){
                  setMensajeGeneral(error.message || "Ocurrio un problema")
            }else{
                setMensajeGeneral('Ocurrio un error desconocido.')
            }
          
        }
       
       
    }
    return (
<>
        <form onSubmit={handleSubmit(crearUsuario)}>
            <span className="mb-1">Email</span>
            <input
                {...register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Debe tener formato valido: ejemplo@dominio.com"
                    }
                })}
                placeholder="Email"

                className="w-full px-4 py-2 rounded border-gray-600 outline-none text-blue-950 border placeholder-gray-500"
            />
            {errors.email && <p>{errors.email.message}</p>}
            <span className=" mb-1">Password</span>
            <input
                type="password"

                {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                        value: 6,
                        message: "La contraseña debe tener al menos 6 caracteres"
                    }
                })}
                placeholder="Password"
                className="w-full px-4 py-2 rounded border-gray-600 mt-2 outline-none   text-blue-950 border placeholder-gray-500"
            />
            {errors.password && <p>{errors.password.message}</p>}
            <span className="mb-1">Confirm password</span>
            <input {...register("confirmPassword", {
                validate: (match) => {
                    const password = getValues("password")
                    return match === password || "Passwords should match!"
                }
            })} type="password" id="confirmPassword"
                className="w-full px-4 py-2 rounded border-gray-600 mt-2 outline-none   text-blue-950 border placeholder-gray-500" />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

            {mensajeGeneral && <p className="text-red-700">{mensajeGeneral}</p> }


            <button type="submit" className="w-full py-2 bg-blue-200/30 hover:bg-blue-300/50 rounded mt-2" >
                Crear usuario
            </button>

        </form>
  {/* {mensajeGeneral && <p className="text-red-700">{mensajeGeneral}</p> } */}
  </>
    )
}
export default FormularioDeRegistro