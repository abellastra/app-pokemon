import fetch from 'node-fetch';
import { Request, Response } from 'express';
import { PokemonApiResponse } from '../adapters/types';

export const pokemonName = async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${req.params.name}`
    );

    if (!response.ok) {
      // Maneja específicamente errores HTTP
      return res.status(404).json({
        success: false,
        message: 'Pokémon no encontrado',
      });
    }

    const data = (await response.json()) as PokemonApiResponse;

    const resultado = {
      name: data.name,

      habilidades: data.abilities.map(a => a.ability.name).join(', '),

      ataques: data.moves.map(m => m.move.name).join(', '),

      foto: data.sprites.front_default,
    };

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ messaje: 'Not found pokemon by name', error });
  }
};