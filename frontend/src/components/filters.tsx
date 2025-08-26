import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tarjeta from './tarjetaPokemon';
import Pagination from './pagination';
// type pokemon = {
//     name: string;
//     ability: string;
//     img: string;
//     description: string;
//     attacks:string,
//     generation:string

// };
type filtersProps = {
  setSelectedGeneration: (value: string | number) => void;
  setSelectedType: (value: string | number) => void;
};

function Filters({ setSelectedGeneration, setSelectedType }: filtersProps) {
  const FiltersType = [
    { value: 'Bug', label: '🐛 Bug' },
    { value: 'Dark', label: '🌑 Dark' },
    { value: 'Dragon', label: '🐉 Dragon' },
    { value: 'Electric', label: '⚡ Electric' },
    { value: 'Fairy', label: '🧚‍♀️ Fairy' },
    { value: 'Fighting', label: '🥊 Fighting' },
    { value: 'Fire', label: '🔥 Fire' },
    { value: 'Flying', label: '🦅 Flying' },
    { value: 'Ghost', label: '👻 Ghost' },
    { value: 'Grass', label: '🌿 Grass' },
    { value: 'Ground', label: '🌍 Ground' },
    { value: 'Ice', label: '❄️ Ice' },
    { value: 'Normal', label: '🌀 Normal' },
    { value: 'Poison', label: '💀 Poison' },
    { value: 'Psychic', label: '🔮 Psychic' },
    { value: 'Rock', label: '🪨 Rock' },
    { value: 'Steel', label: '🛠️ Steel' },
    { value: 'Water', label: '💧 Water' },
    { value: 'Shadow', label: 'Shadow' },
  ];

  const FiltersGeneration = [
    { value: 1, label: 'I' },
    { value: 2, label: 'II' },
    { value: 3, label: 'III' },
    { value: 4, label: 'IV' },
    { value: 5, label: 'V' },
    { value: 6, label: 'VI' },
  ];

  return (
    <div className=' flex flex-wrap gap-4 justify-center items-center mb-4'>
      <label className='block text-center bg-sky-200 m-1 p-2  rounded-xl'>
        Type:
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedType(e.target.value);
          }}
          name='selectedType'
        >
          <option>all</option>
          {FiltersType.map(option => (
            <option
              className='bg-[rgb(128,128,128)]'
              value={option.value}
              key={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className='block text-center  bg-sky-200 p-2   rounded-xl'>
        Generation:
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedGeneration(Number(e.target.value));
          }}
          name='selectedGeneracion'
        >
          <option>all</option>
          {FiltersGeneration.map(option => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
export default Filters;
