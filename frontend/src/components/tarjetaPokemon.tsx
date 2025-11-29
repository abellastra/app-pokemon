import { useState } from 'react';
import Like from './botonLike';
import { useTema } from '../context/temaContext';
import PokemonDescription from './pokemonDescription';
import vector2 from '../assets/vector2.png';
type Pokemon = {
  name: string;
  idPokemon: number;
  ability: string[];
  img: string;
  description: string;
  attacks: string;
  generation: string;
  types: string[];
  isLiked: boolean;
  botonVisible: boolean;
};
type TarjetaProps = Pokemon & {
  setModalDescripcion: (pokemon: Pokemon | null) => void;
};
function Tarjeta({
  name,
  idPokemon,
  ability,
  img,
  description,
  attacks,
  generation,
  types,
  isLiked,
  botonVisible,
  setModalDescripcion,
}: TarjetaProps) {
  const { tema } = useTema();

  const generarColor = (ability: string) => {
    const colores = [
      'red',
      'yellow',
      'blue',
      'purple',
      'pink',
      'indigo',
      'teal',
      'orange',
      'lime',
      'amber',
      'cyan',
      'emerald',
      'fuchsia',
      'rose',
      'violet',
      'sky',
      'stone',
      'gray',
    ];
    const index = ability[0].charCodeAt(0) % colores.length;

    return `bg-${colores[index]}-500`;
  };
  const dataPokemon = {
    name,
    idPokemon,
    ability,
    img,
    description,
    attacks,
    generation,
    types,
    isLiked,
    botonVisible,
    tema,
    generarColor,
  };
  console.log(tema, 'tema en tarjeta');
  console.log(dataPokemon);
  return (
    <>
      <div
        className={`mt-2 ml-4 w-[282px] h-[520px] rounded-[28px] shadow-md p-4 flex flex-col justify-between 
  ${tema === 'claro' ? 'bg-white text-black' : 'bg-[#FFFFFF33] text-white'}`}
      >
        <div className='flex justify-between items-center mb-2'>
          <h4 className='text-base font-semibold'>{name.toUpperCase()}</h4>
          <Like
            idPokemon={idPokemon}
            likeInicial={isLiked}
            botonVisible={botonVisible}
          />
        </div>

        <div className='bg-gray-400 w-full h-[177px] flex justify-center items-center rounded-2xl mb-2'>
          <img className='max-w-[25vh] max-h-[25vh]' src={img} alt={name} />
        </div>

        <div className='flex flex-wrap justify-center gap-2 mb-2'>
          {ability?.slice(0, 2).map((ab, index) => (
            <span
              key={index}
              className={`${generarColor(ab)} px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap`}
            >
              {ab}
            </span>
          ))}
        </div>
        <div className='flex flex-wrap gap-2 mb-2'>
          {types && (
            <span className='bg-sky-300/70 text-black px-2 py-0.5 text-xs font-semibold rounded-full'>
              {types}
            </span>
          )}
        </div>

        <h5 className='text-sm font-medium mb-1 text-center'>
          Generación {generation.toUpperCase()}
        </h5>

        <p className='text-xs mb-2  text-center line-clamp-1'>{description}</p>

        <button
          className='bg-blue-800 text-white py-1 rounded-md hover:bg-blue-900'
          onClick={() => setModalDescripcion(dataPokemon)}
        >
          Ver más
        </button>
      </div>
    </>
  );
}
export default Tarjeta;
