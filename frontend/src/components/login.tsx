import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [correo, setCorreo] = useState<string>("gianella@gmail.com");
    const [contraseña, setContraseña] = useState<string>("holamamama");
    const [correoInValido, setCorreoInValido] =  useState<boolean>();
    const [noEstaRegistrado, setNoEstaRegistrado] = useState<boolean>(false);
    const navegar = useNavigate();



    function validarDatos() {
        const esValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
        if (esValido) {
            setCorreoInValido(false)
            preguntarSiEsUsuario()
        } else {
            console.log("revisar el correo o la contraseña")
            setCorreoInValido(true)
        }
    }
    async function preguntarSiEsUsuario() {
        try {
            const respuesta = await fetch(`http://localhost:3000/login-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo: correo,
                    contraseña: contraseña,
                })
            });

            const resultado = await respuesta.json();
            if (!resultado.ok) {
                setNoEstaRegistrado(true)
                throw new Error("No se encontro un usuario");
            } else {
    
                setNoEstaRegistrado(false);
                navegar("/perfiles");
            }
     } catch (error) {
            console.log("OOops algo ocurrio", error)

            setNoEstaRegistrado(true);
        }
    }

    return (
        <div className="flex justify-center  ">
            <div className="bg-blue-200/20 px-8 py-10 rounded-md max-w-md w-full mx-auto">
                <h2 className="text-white">Iniciar sesión </h2>
                <form className="w-full max-w-sm space-y-4">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className="w-full px-4 py-2 rounded text-blue-950 border border-gray-600 outline-none"
                    />
                    {correoInValido && (
                        <p className="text-red-500 text-sm">El correo esta mal</p>
                    )}
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        className="w-full px-4 py-2 rounded  text-blue-950 border border--600 mt-2 outline-none"
                    />
                    {noEstaRegistrado && (
                        <p className="text-red-500 text-sm">No existe un usuario con ese correo y/o contraseña</p>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-200/30 hover:bg-blue-200/50 rounded mt-2"
                        onClick={(e) => {
                            e.preventDefault();
                            validarDatos();
                        }}
                    >
                        Iniciar sesión
                    </button>

                </form>
                <p className=" text-center my-4 ">O</p>
                {/* <p>¿Todavía no tenes una cuenta? <Link to="">Suscribite</Link></p> */}

            </div>
        </div>
    )
}

export default Login;