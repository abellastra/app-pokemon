export const obtenerLike = async () => {
    try {
        const respuesta = await fetch ('http://localhost:3000/obtener-like',{
            method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            },
          credentials:'include'
        })
        if (!respuesta.ok) {
            throw new Error('Ocurrio un problema al obtener los "Me gusta" ');

        }

        const resultado = await respuesta.json()
       
        localStorage.setItem('likes', JSON.stringify(resultado.listaIds));
        return resultado.listaIds || [];


    } catch (error) {
        console.error(error);
        return [];
    }
}