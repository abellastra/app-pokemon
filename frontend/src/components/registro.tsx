import { useForm } from "react-hook-form";
import { crearSolicitudUsuario } from "../services/usert";

type formData = {
    email: string;
    password: string;
    confirmPassword:string;
}
type user = {
    password:string;
    email:string;
}

const FormularioDeRegistro = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<formData>()
    const crearUsuario = (datos:user) => {
        const mandarsolicitud = crearSolicitudUsuario
        console.log("adentro del registro de usuario")
        mandarsolicitud(datos)
       
    }
    return (
        <form onSubmit={handleSubmit(crearUsuario)}>
            <span className="text-white mb-1">Email</span>
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
             <span className="text-white mb-1">Password</span>
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
             <span className="text-white mb-1">Confirm password</span>
            <input {...register("confirmPassword", {
                validate: (match) => {
                    const password = getValues("password")
                    return match === password || "Passwords should match!"
                }
            })} type="password" id="confirmPassword" 
             className="w-full px-4 py-2 rounded border-gray-600 mt-2 outline-none   text-blue-950 border placeholder-gray-500"/>
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

             <button
                        type="submit"
                        className="w-full py-2 bg-blue-200/30 hover:bg-blue-200/50 rounded mt-2"
                       
                       >
                        Iniciar sesión
            </button>

        </form>
    )
}
export default FormularioDeRegistro