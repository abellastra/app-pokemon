import { Console } from 'console';
import { Request, Response } from 'express';
import { API_POKEMONES_GENERATION } from '../constants';
interface IPokemon {
  name: string;
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: { front_default: string };
  species: { url: string };
}

export const filtersDb = async (req: Request, res: Response) => {
  const generation = req.params.selectedGeneration;

  const response = await fetch(
    `${API_POKEMONES_GENERATION}${parseInt(generation)}`
  );

  try {
    if (!response.ok) {
      console.error(`Error ${response.status}: ${response.statusText}`);
      return null ;
    }
    const data = await response.json();

    const resultado = await Promise.all(
      data.pokemon_species.map(async (pokemon: IPokemon) => {
        const name = pokemon.name;
        const pokeRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        if (!pokeRes.ok) {
          console.error(`Error ${resultado}`);
          return null;
        }
        const pokeData = await pokeRes.json();

        const descRes = await fetch(pokeData.species.url);
        if (!pokeRes.ok) {
          console.error(`Error ${resultado}`);
          return null   ;
        }
        const descData = await descRes.json();

        const description = descData.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'es'
        ).flavor_text;
        const generation = descData.generation.name.replace('generation-', '');

        const habilidades = pokeData.abilities.map((a: any) => a.ability.name);
        const ataques = pokeData.moves.map((m: any) => m.move.name);
        const foto = pokeData.sprites.front_default;
        return {
          name: name,
          ability: habilidades.join(', '),
          img: foto,
          description: description,
          attacks: ataques.join(', '),
          generation: generation,

        };
      })
    );
     
    res.status(200).json({ resultado: resultado });
  } catch (error) {
    console.log(error);
  }
};
