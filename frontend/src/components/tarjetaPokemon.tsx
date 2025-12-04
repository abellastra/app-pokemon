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
  console.log(ability, 'ability en tarjeta', name);
  return (
    <>
      <div
        className={`w-[30%] sm:w-[40%] md:w-[40%] lg:w-[80%] h-[80%] rounded-[4vh] p-[1vh] flex flex-col justify-between
         bg-[rgb(255,255,255)]/7 text-white shadow-xl`}
      >
        {/* Header */}
        <div className='flex justify-center items-center  mb-[1vh]'>
          <h4 className='text-[2vh] font-bold capitalize'>
            {name}
          </h4>
          <Like
            idPokemon={idPokemon}
            likeInicial={isLiked}
            botonVisible={botonVisible}
          />
        </div>

        {/* Imagen */}
        <div className='bg-[#8a8989ff]/10 w-full h-[25vh] flex justify-center items-center rounded-[2vh] mb-[1vh]'>
          <img className='w-[25vh] h-[25vh]' src={img} alt={name} />
        </div>

        {/* Abilities */}
        <div className='flex flex-wrap justify-center gap-[1vh] mb-[1vh]'>
          {ability?.slice(0, 2).map((ab: string, index: number) => (
            <span
              key={index}
              className={`${generarColor(ab)} px-[1vh] py-[0.5vh] text-[1.5vh] font-semibold rounded-full whitespace-nowrap`}
            >
              {ab}
            </span>
          ))}
        </div>

        {/* Generación */}
        <h5 className='text-[1.8vh] font-medium mb-[0.5vh] text-center'>
          Generación {generation.toUpperCase()}
        </h5>

        {/* Descripción */}
        <p className='text-[1.5vh] mb-[1vh] text-center line-clamp-1'>
          {description}
        </p>

        {/* Botón */}
        <button
          className='bg-blue-800 text-white py-[1vh] m-[1vh] rounded-[1vh] hover:bg-blue-900 text-[1.5vh]'
          onClick={() => setModalDescripcion(dataPokemon)}
        >
          Ver más
        </button>
      </div>
    </>
  );
}
export default Tarjeta;
