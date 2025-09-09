import { useState, useCallback } from "react";
type id_pokemon = {
    idPokemon:number
}
const Like = (idPokemon:id_pokemon) => {
    const [likePhoto, setLike] = useState<boolean>(false)

    const updateLike = useCallback(async (nuevoValor: boolean) => {
        try {
            const respuesta = await fetch('http://localhost:3000/like-pokemon', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    statusPhoto: nuevoValor,
                    idPokemon:idPokemon.idPokemon
                 }),
                credentials:'include',
            })
            console.log(idPokemon.idPokemon)
            const resultado = await  respuesta.json();
            if(!resultado.ok){
                throw new  Error ('algo ocurrio')
            }
        } catch (error) {
            console.error("Error al actualizar like:", error);
        }
    }, [])
     const handleLike = () => {
        const nuevoValor = !likePhoto;
        setLike(nuevoValor)
        updateLike(nuevoValor)
     }

   

    return (
        <>
            <button className="focus:outline-none" onClick={()=>handleLike()}>
                {likePhoto ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="red"
                        className="size-8 transition-transform duration-200 ease-in-out transform scale-110"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8 transition-transform duration-200 ease-in-out hover:scale-110"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                    </svg>

                )}
            </button>
        </>

    )
}
export default Like;