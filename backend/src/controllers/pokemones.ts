import { Request, Response } from 'express';
import {
  getPokemons,
  pokemonesGeneration,
  pokemonesType,
} from '../adapters/pokemonapi';
import { PokemonApiResponse } from '../adapters/types';

export const getPokemones = async (req: Request, res: Response) => {
  const offset = parseInt(req.query.offset as string);
  const limit = parseInt(req.query.limit as string);
  const type = req.query.type as string;
  const generation = parseInt(req.query.generation as string) || 0;
  const typeInt: Record<string, number> = {
    normal: 1,
    fighting: 2,
    flying: 3,
    poison: 4,
    ground: 5,
    rock: 6,
    bug: 7,
    ghost: 8,
    steel: 9,
    fire: 10,
    water: 11,
    grass: 12,
    electric: 13,
    psychic: 14,
    ice: 15,
    dragon: 16,
    dark: 17,
    fairy: 18,
  };
  const typeNum = typeInt[type];

  try {
    if (typeNum > 0 && generation <= 0) {
      const response_url = await pokemonesType({
        typeNum,
        offset,
        limit,
        generation,
      });
      const resultado = await Promise.all(
        response_url.dataPokemon.map(async pokemon => {
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

      return res
        .status(200)
        .json({ resultado: resultado, infoPages: response_url.total });
    }

    if (generation > 0) {
      const response_url = await pokemonesGeneration({
        offset,
        limit,
        generation,
      });

      const resultado = await Promise.all(
        response_url.resultado.map(async (pokemon: PokemonApiResponse) => {
          const name = pokemon.name || [];
          const abilities =
            pokemon.abilities.map((a: any) => a.ability.name) || [];
          const attacks = pokemon.moves?.map((m: any) => m.move.name) || [];
          const img = pokemon.sprites?.front_default || '';

          const descRes = await fetch(pokemon.species.url);
          const descData = await descRes.json();

          const types = pokemon.types.map(t => t.type.name);

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
            types: types.join(', '),
          };
        })
      );
      const filteredByType = type
        ? resultado.filter(p => p.types.includes(type))
        : resultado;
              if (filteredByType.length === 0) {
                return res
                  .status(200)
                  .json({
                    resultado: 'No hay pokemones con esos filtros',
                    infoPages: 0,
                  });
              }

      if (type == 'all' || !type) {
        const filterPokemones = resultado.slice(
          offset ?? 0,
          (offset ?? 0) + limit
        );
        return res.status(200).json({
          resultado: filterPokemones,
          infoPages: response_url.total,
        });
      }
      return res
        .status(200)
        .json({ resultado: filteredByType, infoPages: filteredByType.length });
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
