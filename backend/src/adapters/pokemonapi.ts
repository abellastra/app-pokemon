import fetch from 'node-fetch';
import { API_POKEMON } from '../constants';
import { PokemonApiResponse } from './types';
type Props = {
  offset?: number;
  limit?: number;
};

type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

const getPokemonsList = async (props: Props): Promise<PokemonListResponse> => {
  const { offset,limit } = props;
console.log( offset,  limit);
  if (offset ==undefined|| limit==undefined) {
    throw new Error('Size must be greater than 0');
  }


  const response = await fetch(`${API_POKEMON}?limit=${limit}&offset=${offset}`);

  const data = await response.json();

  return data as PokemonListResponse;
};

export const getPokemons = async (props: Props): Promise<{ dataPokemon: PokemonApiResponse[]; count: number }> => {
  const { offset,limit} = props;

  const pokemonsList = await getPokemonsList({ offset, limit });

  const urls = pokemonsList.results.map(pokemon => pokemon.url);
  
  const count = pokemonsList.count;

  const dataPokemon = await Promise.all(
    urls.map(async url => {
      const res = await fetch(url);
      return (await res.json()) as PokemonApiResponse;
    })
  );
  
  const resultado = {dataPokemon, count };

  return resultado;
};
