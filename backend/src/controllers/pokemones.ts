import { Request, Response } from 'express';
import { getPokemons } from '../adapters/pokemonapi';
console.log('Controlador de pokemones cargado /// pokemones.ts');
export const getPokemones = async (req: Request, res: Response) => {
  try {
    // Validar la request
    // Llamar al service
    // Validar la respuesta
    // Retornar

    const dataPokemon = await getPokemons({ size: 20 });

    const resultado = dataPokemon.map(pokemon => {
      const name = pokemon.name;

      const habilidades = pokemon.abilities.map(a => a.ability.name);
      console.log(habilidades.join(', '));

      const ataques = pokemon.moves.map(m => m.move.name);
      console.log(ataques.join(', '));

      const foto = pokemon.sprites.front_default;
      console.log(foto);

      return {
        name: name,
        habilidades: habilidades.join(', '),
        ataques: ataques.join(', '),
        foto: foto,
      };
    });

    res.status(200).json(resultado);
  } catch {
    res.status(500).json({ message: 'Error fetching pokemones' });
  }
};
