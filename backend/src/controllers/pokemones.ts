import { Request, Response } from 'express';
import { getPokemons } from '../adapters/pokemonapi';
import { pokemonesType } from '../adapters/pokemonapi';
import { pokemonesGeneration } from '../adapters/pokemonapi';
import { PokemonApiResponse } from '../adapters/types';

export const getPokemones = async (req: Request, res: Response) => {
  const offset = parseInt(req.query.offset as string);
  const limit = parseInt(req.query.limit as string);
  const type = parseInt(req.query.type as string);
  const generation = parseInt(req.query.generation as string);
  console.log(offset, limit, type, generation, 'offset, limit, type, generation');
  
  try {

    if (type > 0) {
      const response_url = await pokemonesType({ type });
      const resultado = await Promise.all(
        response_url.map(async pokemon => {
          const name = pokemon.name;
          const abilities = pokemon.abilities.map(a => a.ability.name);
          const attacks = pokemon.moves.map(m => m.move.name);
          const img = pokemon.sprites.front_default;
          const type = pokemon.types.map(t => t.type.name);

          const descRes = await fetch(pokemon.species.url);
          const descData = await descRes.json();

          const description = descData.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'es'
          )?.flavor_text;
          const generation = descData.generation.name.replace(
            'generation-',
            ''
          );
          return {
            name: name,
            ability: abilities.join(', '),
            attacks: attacks.join(', '),
            img: img,
            generation: generation,
            description: description,
            type: type.join(', '),
          };
        })
      );
           const filterPokemones = resultado.slice(offset, offset + 20);
           console.log(filterPokemones,'filterPokemones');

           return res
             .status(200)
             .json({ resultado: filterPokemones, infoPages: resultado.length });
    }

    if (generation > 0) {
      const response_url = await pokemonesGeneration({ generation });
      const resultado = await Promise.all(
        response_url.map(async (pokemon: PokemonApiResponse) => {
          const name = pokemon.name || [];
          const abilities =
            pokemon.abilities.map((a: any) => a.ability.name) || [];
          const attacks = pokemon.moves?.map((m: any) => m.move.name) || [];
          const img = pokemon.sprites?.front_default || '';

          const descRes = await fetch(pokemon.species.url);
          const descData = await descRes.json();
          const description = descData.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'es'
          )?.flavor_text;
          const generation = descData.generation.name.replace(
            'generation-',
            ''
          );
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
 

     const filterPokemones = resultado.slice(offset, offset + 20);

      return res.status(200).json({ resultado: filterPokemones, infoPages: resultado.length  });
    }

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
