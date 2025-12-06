import { requestConCookie } from "./api";

type idsPokemonApi = number[]
export const obtenerLike = async (idsPokemonApi: idsPokemonApi) => {
    try {
        const respuesta = await requestConCookie(
          `${import.meta.env.VITE_API_URL}obtener-like`,
          {
            method: 'POST',

            body: JSON.stringify(idsPokemonApi),
          }
        );
        if (!respuesta.ok) {
            throw new Error('Ocurrio un problema al obtener los "Me gusta" ');

        }

        const resultado = await respuesta

        localStorage.setItem('likes', JSON.stringify(resultado.enComun));
        return resultado.enComun || [];


    } catch (error) {
        console.error(error);
        return [];
    }
}