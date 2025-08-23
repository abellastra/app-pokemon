import { Request, Response } from 'express';
import { getPokemons } from '../adapters/pokemonapi';
export const getPokemones = async (req: Request, res: Response) => {
  const offset = parseInt(req.query.offset as string);
  const limit = parseInt(req.query.limit as string);
  try {
    const response_url = await getPokemons({ offset, limit });

    const resultado = await Promise.all(
      response_url.dataPokemon.map(async pokemon => {
        const name = pokemon.name;
        const abilities = pokemon.abilities.map(a => a.ability.name);
        const attacks = pokemon.moves.map(m => m.move.name);
        const img = pokemon.sprites.front_default;

        const descRes = await fetch(pokemon.species.url);
        const descData = await descRes.json();
        const description = descData.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'es'
        ).flavor_text;
        const generation = descData.generation.name.replace('generation-', '');
        
        return {
          name: name,
          ability: abilities.join(', '),
          attacks: attacks.join(', '),
          img: img,
          generation: generation,
          description: description,
        };
      })
    );

    res
      .status(200)
      .json({ resultado: resultado, infoPages: response_url.count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pokemones' + error });
  }
};
