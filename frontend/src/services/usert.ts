
type user = {

    password: string;
    email: string;
    userName:string
}
export async function crearSolicitudUsuario(dataUser: user) {
    try {
        const respuesta = await fetch(`http://localhost:3000/crear-user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: dataUser.email,
                userName:dataUser.userName,
                password: dataUser.password


            })
        })
       
        const resultado = await respuesta.json()

        if (!respuesta.ok) {
            throw new Error(resultado.message);

        }
        return resultado
    } catch (error:unknown) {
        if (error instanceof Error) {
            throw new Error("No se pudo conectar con el servidor:", error);
        } else {
            throw new Error("No se pudo conectar con el servidor");
        }
    }
}