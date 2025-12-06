type user = {

    password: string;
    email: string;
    userName: string
}
export async function crearSolicitudUsuario(dataUser: user) {
    try {
        const respuesta = await fetch(
          `${import.meta.env.VITE_API_URL}crear-user`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              email: dataUser.email,
              userName: dataUser.userName,
              password: dataUser.password,
            }),
          }
        );

        const resultado = await respuesta.json()

        if (!respuesta.ok) {
            throw new Error(resultado.message);
        }
        return resultado
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }
    }
}