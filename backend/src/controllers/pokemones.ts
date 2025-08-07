import { Request, Response } from 'express';
import { getPokemons } from '../adapters/pokemonapi';
import { info } from 'console';
import { promises } from 'fs';
console.log('Controlador de pokemones cargado /// pokemones.ts');
export const getPokemones = async (req: Request, res: Response) => {
  try {
    // Validar la request
    // Llamar al service
    // Validar la respuesta
    // Retornar

    const response_url = await getPokemons({ size: 20 });

    const resultado = await Promise.all(
      response_url.dataPokemon.map(async pokemon => {
        const name = pokemon.name;
        const habilidades = pokemon.abilities.map(a => a.ability.name);
        const ataques = pokemon.moves.map(m => m.move.name);
        const foto = pokemon.sprites.front_default;

        const descRes = await fetch(pokemon.species.url);
        const descData = await descRes.json();
        const description = descData.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'es').flavor_text;
        return {
          name: name,
          habilidades: habilidades.join(', '),
          ataques: ataques.join(', '),
          foto: foto,
          description: description,
          
        };
      })
    );

    res
      .status(200)
      .json({ resultado: resultado, infoPages: response_url.count });
  } catch {
    res.status(500).json({ message: 'Error fetching pokemones' });
  }
};
