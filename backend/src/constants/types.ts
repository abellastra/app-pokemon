export const POKEMON_TYPE = [
  {
    name: 'normal',
    id: 1,
  },
  {
    name: 'fighting',
    id: 2,
  },
];

export const isValidPokemonType = (type: string) => {
  return POKEMON_TYPE.some(t => t.name === type.toLowerCase());
};
