import { useState } from 'react';
import Like from './botonLike';
import { useTema } from '../context/temaContext';
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
    <div
      className={`mt-2 gap-1 ml-2 pt-1 pb-1  h-[368px] flex justify-center items-center text-center rounded-[28px] shadow-m
         ${tema=== 'claro'?  'bg-[rgb(255,255,255)] text-[rgb(0, 0, 0)] '
                    : 'bg-[rgb(108,108,115)] '
         }`}>
      <div className=' gap-4 relative flex flex-col justify-center items-center h-[310px] w-[200px] text-center pr-1 '>
        <h4 className='bg-sky-200 p-1 rounded-xl text-base mr-1 '>
          {name.toUpperCase()}
        </h4>
        <h5 className='bg-sky-300  rounded-xl'>{types}</h5>
        
          <div className={`absolute  top-0 right-2 z-10  rounded-full flex justify-center items-center`}>
            <Like
              idPokemon={idPokemon}
              likeInicial={isLiked}
              botonVisible={botonVisible}
            />
          </div>

          <img className='max-w-[25vh] max-h-[25vh]' src={img} alt='' />
       

        <div className='flex   items-center w-[26vh] h-[10vh] max-h-[20vh] max-w-full  overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-sky-300 '>
          {ability &&
            ability.map(ability => (
              <span
                className={` ${generarColor(ability)} m-1 p-0.5 whitespace-nowrap  text-xs font-semibold  rounded-full`}
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

        {showDescription && (
          <div className='absolute bg-gray-100 p-2 rounded-md mt-9 inset-0 pt-8 items-center '>
            <p className='text-xs'>{description}</p>
            <button
              className='bg-red-200 p-1 rounded-md hover:bg-red-300 mt-2 '
              onClick={() => setShowDescription(false)}
            >
              Hide description
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Tarjeta;
