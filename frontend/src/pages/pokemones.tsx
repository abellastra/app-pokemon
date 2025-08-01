import { useEffect, useState } from "react";
import Tarjeta from "../components/tarjetaPokemon";

type Pokemon = {
  name: string;
  url:string
};


function Pokemones() {
const [listaPokemones, setListaPokemones] = useState<Pokemon[]>([])
    useEffect(() => {
        pedirDatosPokemones();
    }, [])
    const pedirDatosPokemones = async () => {
        const response = await fetch("http://localhost:3000/pokemones", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            setListaPokemones(data.results)
            console.log(data);
    //         const abilities = data.abilities.map(ability => ability.ability.name);
    // console.log(abilities)
            // aca tendria que navegar a las tarjetas y pasarle los datos para
            // llenarlas
        }
    };



    return (
        <section id="tajetas" className="py-4 px-4 pb-16 max-w-xl mx-auto min-h-dvh mt-14 flex flex-col items-center ">
            { listaPokemones.map((pokemon) =>
                    <Tarjeta
                    key={pokemon.name}
                    name={pokemon.name}
                    // url={pokemon.url}
                    />
            )}
            
        </section>
    )
}
export default Pokemones