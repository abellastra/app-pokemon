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
  botonVisible:boolean;
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
  botonVisible
}: Pokemon) {
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const{tema}=useTema()
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
   };

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

  return (
    <>
      <div
        className={`mt-2 pt-2  flex justify-center items-center rounded-lg shadow-m
         ${
           tema === 'claro'
             ? 'bg-[rgb(255,255,255)] text-[rgb(0, 0, 0)] '
             : 'bg-[rgb(108,108,115)] '
         }`}
      >
        <div className=' relative flex flex-col justify-center items-center h-[30vh] w-full  '>
          <h4 className='bg-sky-200 p-1 rounded-xl font-medium	 mb-1'>
            {name.toUpperCase()}
          </h4>
          <h5 className='bg-sky-300  rounded-xl'>{types}</h5>
          <div className='relative'>
            <div
              className={`absolute p-0.5 right-2 z-10  rounded-full flex justyfi-center items-center `}
            >
              <Like
                idPokemon={idPokemon}
                likeInicial={isLiked}
                botonVisible={botonVisible}
              />
            </div>

            <img className='max-w-[25vh] max-h-[25vh]' src={img} alt='' />
          </div>

          <div className='flex   items-center w-[26vh] h-[10vh] max-h-[20vh] max-w-full  overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-sky-300 '>
            {ability &&
              ability.map(ability => (
                <span
                  className={` ${generarColor(ability)} m-1 p-0.5 whitespace-nowrap  text-xs font-semibold   rounded rounded-full`}
                >
                  {ability}
                </span>
              ))}
          </div>
          <h5 className='font-medium'>Generation {generation.toUpperCase()}</h5>

          <div className=' flex justify-center'>
            <button
              className='bg-sky-200  p-1 rounded-md hover:bg-sky-300 '
              onClick={() => {
                setShowDescription(true);
              }}
            >
              Show description{' '}
            </button>
          </div>
        </div>
      </div>

      {showDescription && (
        <div className='fixed inset-0 bg-black/50 flex  flex-col justify-center items-center z-[9999]'>
          <div className='bg-black/50 w-[400px] h-[800px] p-4  z-9999 rounded-lg max-w-lg w-full'>
            <PokemonDescription dataPokemon={dataPokemon} />
          </div>

          <img
            className=' w-full  h-[600px] absolute top-[55vh]'
            src={vector2}
            alt=' vecto 2'
          />
          <div>
            <button  onClick={()=>setShowDescription(false)} className='w-[10px] h-[10vh]   text-7xl absolute z-999   '>
              x
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default Tarjeta;
