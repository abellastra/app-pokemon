import { useState } from 'react';
import Like from './botonLike';
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
      className='mt-2 pt-2 bg-red-100 flex justify-center items-center bg-white rounded-lg shadow-md
       '
    >
      {/* min-h-[27vh] max-h-[40vh] h-auto */}
      {/* /*w-[200px] min-h-[240px] max-h-[240px] lg:min-h-[250px]*/}
      <div className=' relative flex flex-col justify-center items-center h-full w-full  '>
        <h4 className='bg-sky-200 p-1 rounded-xl font-medium	 mb-1'>
          {name.toUpperCase()}
        </h4>
        <h5 className='bg-sky-300  rounded-xl'>{types}</h5>
        <div className='relative'>
          <div className=' absolute top-2 right-2 z-10'>
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

        <div className=' flex flex justify-center'>
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
          <div className='absolute bg-gray-100 p-2 rounded-md mt-2 inset-0  items-center '>
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
