import { useEffect, useState } from 'react';
import Tarjeta from '../components/tarjetaPokemon';

type Pokemon = {
    name: string;
    habilidades: string;
    ataques: string;
    foto: string;
};

function Pokemones() {
  const [listaPokemones, setListaPokemones] = useState<Pokemon[]>([]);

  useEffect(() => {
    pedirDatosPokemones();
  }, []);
  const pedirDatosPokemones = async () => {
    const response = await fetch('http://localhost:3000/pokemones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      setListaPokemones(data);
    }
  };

  return (
    <section
      id='tajetas'
      className='py-4 px-4 pb-16 max-w-xl mx-auto min-h-dvh mt-14 flex flex-col items-center '
    >
      {listaPokemones.map(pokemon => (
        <Tarjeta
          key={pokemon.name}
          name={pokemon.name}
          habilidades={pokemon.habilidades}
          ataques={pokemon.ataques}
          foto={pokemon.foto}
        />
      ))}
    </section>
  );
}
export default Pokemones;
