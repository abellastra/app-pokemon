type idsPokemonApi = number[]
export const obtenerLike = async (idsPokemonApi:idsPokemonApi) => {
    try {
        const respuesta = await fetch ('http://localhost:3000/obtener-like',{
            method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(idsPokemonApi),
         credentials:'include'
        })
        if (!respuesta.ok) {
            throw new Error('Ocurrio un problema al obtener los "Me gusta" ');

        }

        const resultado = await respuesta.json()
       
        localStorage.setItem('likes', JSON.stringify(resultado.enComun));
        return resultado.enComun || [];


    } catch (error) {
        console.error(error);
        return [];
    }
}