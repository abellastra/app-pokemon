type PropsFetchPokemons = {
  offset: number;
  limite: number;
  type?: string;
  generation?: number;
};

export type PokemonApi = {
  ataques: string;
  description: string;
  foto: string;
  generation: string;
  habilidades: string;
  name: string;
};

type ResponseFetchPokemons = {
  resultado: PokemonApi[];
  infoPages: number;
};

export const fetchPokemonsApi = async ({
  offset,
  limite,
  type,
  generation,
}: PropsFetchPokemons): Promise<ResponseFetchPokemons> => {
  const buildUrl = new URL('http://localhost:3000/pokemones');

  buildUrl.searchParams.set('offset', offset.toString());
  buildUrl.searchParams.set('limit', limite.toString());

  if (type) {
    buildUrl.searchParams.set('type', type);
  }

  if (generation) {
    buildUrl.searchParams.set('generation', generation.toString());
  }

  const response = await fetch(buildUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }

  return {
    resultado: [],
    infoPages: 0,
  };
};
