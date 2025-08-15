import { Console } from 'console';
import { Request, Response } from 'express';
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
    `https://pokeapi.co/api/v2/generation/${parseInt(generation)}/`
  );

  try {
    if (response.ok) {
      const data = await response.json();

      const resultado = await Promise.all(
        data.pokemon_species.map(async (pokemon: IPokemon) => {
          const name = pokemon.name;
          const pokeRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );
          const pokeData = await pokeRes.json();

          const descRes = await fetch(pokeData.species.url);

          const descData = await descRes.json();

          const description = descData.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'es'
          ).flavor_text;
          const generation = descData.generation.name.replace(
            'generation-',
            ''
          );

          const habilidades = pokeData.abilities.map((a:any) => a.ability.name);
          const ataques = pokeData.moves.map((m:any) => m.move.name);
          const foto = pokeData.sprites.front_default;

          return {
            name: name,
            habilidades: habilidades.join(', '),
            ataques: ataques.join(', '),
            foto: foto,
            description: description,
            generation: generation,
          };
        })
      );

      res.status(200).json({ resultado: resultado });
    }
  } catch (error) {
    console.log(`error al obtener pokemones${error}`);
  }
};
