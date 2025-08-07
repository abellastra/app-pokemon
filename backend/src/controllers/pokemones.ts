import { Request, Response } from 'express';
import { getPokemons } from '../adapters/pokemonapi';
import { info } from 'console';
console.log('Controlador de pokemones cargado /// pokemones.ts');
export const getPokemones = async (req: Request, res: Response) => {
  try {
    // Validar la request
    // Llamar al service
    // Validar la respuesta
    // Retornar

    const response_url = await getPokemons({ size: 20 });

    const resultado = response_url.dataPokemon.map(pokemon => {
      const name = pokemon.name;

      const habilidades = pokemon.abilities.map(a => a.ability.name);
      
      const ataques = pokemon.moves.map(m => m.move.name);

      const foto = pokemon.sprites.front_default;
      


    const descripcion = pokemon.species.name;
    console.log('Descripcion:', descripcion);
        return {
          name: name,
          habilidades: habilidades.join(', '),
          ataques: ataques.join(', '),
          foto: foto,
          // infopPges: infopPges
        };
      });

      res
        .status(200)
        .json({ resultado: resultado, infoPages: response_url.count });
    } catch {
      res.status(500).json({ message: 'Error fetching pokemones' });
    }
  };
