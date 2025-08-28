import fetch from 'node-fetch';
import { API_POKEMON } from '../constants';
import { PokemonApiResponse } from './types';
import { Console } from 'console';
import { listenerCount } from 'process';
type Props = {
  offset?: number;
  limit?: number;
  type?: number;
  generation?: number;
};

type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

type PokemonListResponseType = {
  id: number;
  name: string;
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
};
type PokemonListResponseGeneration = {
  name: string;
  pokemon_species: {}[];
};
const getPokemonsList = async (props: Props): Promise<PokemonListResponse> => {
  const { offset, limit } = props;
  if (offset == undefined || limit == undefined) {
    throw new Error('Size must be greater than 0');
  }

  const response = await fetch(
    `${API_POKEMON}?limit=${limit}&offset=${offset}`
  );

  const data = await response.json();

  return data as PokemonListResponse;
};

export const getPokemons = async (
  props: Props
): Promise<{ dataPokemon: PokemonApiResponse[]; count: number }> => {
  const { offset, limit } = props;

  const pokemonsList = await getPokemonsList({ offset, limit });

  const urls = pokemonsList.results.map(pokemon => pokemon.url);
  const count = pokemonsList.count;

  const dataPokemon = await Promise.all(
    urls.map(async url => {
      const res = await fetch(url);
      return (await res.json()) as PokemonApiResponse;
    })
  );

  const resultado = { dataPokemon, count };

  return resultado;
};

const getPokemonestype = async (
  props: Props
): Promise<PokemonListResponseType> => {
  const type = props.type;
  if (type == undefined) {
    throw new Error('Size must be greater than 0');
  }
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await response.json();
  return data as PokemonListResponseType;
};

export const pokemonesType = async (props: Props) => {
  const ListPokemonestype = await getPokemonestype(props);

  const urls = ListPokemonestype.pokemon.map((p: any) => p.pokemon.url);
  const dataPokemon = await Promise.all(
    urls.map(async url => {
      const res = await fetch(url);
      return (await res.json()) as PokemonApiResponse;
    })
  );
  const resultado = dataPokemon;
  return resultado;
};

const getPokemonesGeneration = async (
  props: Props
): Promise<PokemonListResponseGeneration> => {
  const generation = props.generation;
  if (generation == undefined) {
    throw new Error('Size must be greater than 0');
  }
  const response = await fetch(
    `https://pokeapi.co/api/v2/generation/${generation}`
  );
  const data = await response.json();
  return data as PokemonListResponseGeneration;
};

export const pokemonesGeneration = async (props: Props) => {
  const ListPokemonesGeneration = await getPokemonesGeneration(props);

  const urls = ListPokemonesGeneration.pokemon_species.map(
    (p: any) => `https://pokeapi.co/api/v2/pokemon/${p.name}`

  );

  const dataPokemon = await Promise.all(
    urls.map(async url => {
      console.log(url, 'url');
      
      const res = await fetch(url);
      console.log(res, 'res');
          if (!res.ok) {
            return null;
          }
      return (await res.json()) as PokemonApiResponse;
    })
  );
  const resultado = dataPokemon.filter(p => p !== null);
  return resultado;
};
