import fetch from 'node-fetch';
import { API_POKEMON } from '../constants';
import { isValidPokemonType } from '../constants/types';
import { PokemonApiResponse } from './types';
type Props = {
  offset?: number;
  limit?: number;
  type?: string;
  generation?: string;
};

type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

const isValidGeneration = (generation: string) => {
  return (
    generation === '1' ||
    generation === '2' ||
    generation === '3' ||
    generation === '4' ||
    generation === '5'
  );
};

const getPokemonsList = async (props: Props): Promise<PokemonListResponse> => {
  const { offset, limit, type, generation } = props;
  if (offset == undefined || limit == undefined) {
    throw new Error('Size must be greater than 0');
  }

  // TODO: Validar type
  if (type && !isValidPokemonType(type)) {
    throw new Error('Invalid type');
  }

  // TODO: Validar generacion minima y maxima
  if (generation && !isValidGeneration(generation)) {
    throw new Error('Invalid generation');
  }

  // TODO: ARMAR QUERY FILTRANDO POR TYPE Y GENERATION
  // TODO: SI NO FILTRA POR TYPE, NI POR GENERATION LLAMAR AL DE SIEMPRE
  //const response = await getAllPokemonsPaginated({ offset, limit});

  const response = await fetch(
    `${API_POKEMON}?limit=${limit}&offset=${offset}`
  );

  // TODO: Si filtra SOLO por TYPE, llamar a `/type/${typeID}`
  // const response = await getAllPokemonByType({ offset, limit, typeID});

  // TODO: Si filtra SOLO por GENERATION, llamar a `/generation/${generation}`
  // const response = await getAllPokemonByGeneration({ offset, limit, generation});

  // TODO: Si filtra por TYPE y GENERATION, llamar a `/generation/${generation}` y filtrar por type a mano
  // const response = await getAllPokemonByTypeAndGeneration({ offset, limit, typeID, generation});
  // Va a llamar a: await getAllPokemonByGeneration({ offset, limit, generation}); // Y LUEGO FILTRA POR TYPE y retorna y PAGINA

  const data = await response.json();

  return data as PokemonListResponse;
};

export const getPokemons = async (
  props: Props
): Promise<{ dataPokemon: PokemonApiResponse[]; count: number }> => {
  const { offset, limit, type, generation } = props;

  const pokemonsList = await getPokemonsList({
    offset,
    limit,
    type,
    generation,
  });

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
