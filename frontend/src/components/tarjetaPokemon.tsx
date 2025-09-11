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
  isLiked:boolean
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
  isLiked
}: Pokemon) {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  console.log(ability);

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
    // <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full">
    <div
      className='  flex justify-center items-center bg-white rounded-lg shadow-md h-70  w-40  lg:h-65  w-50 
     '
    >
      <div className=' relative flex flex-col justify-center items-center h-full w-50 lg:h-full w-full  '>
        <h4 className='bg-sky-200 p-1 rounded-xl font-medium	 mb-1'>
          {name.toUpperCase()}
        </h4>
        <h5 className='bg-sky-300  rounded-xl'>{types}</h5>
        <img className='w-25 h-25' src={img} alt='' />

        <div className='flex'>
          {ability &&
            ability.map(ability => (
              <span
                className={` ${generarColor(ability)} m-1 p-0.5 whitespace-nowrap  text-xs font-semibold   rounded`}
              >
                {ability}
              </span>
            ))}
        </div>
        <h5 className='font-medium'>Generation {generation.toUpperCase()}</h5>

        <div>
          <button
            className='bg-sky-200 p-1 rounded-md hover:bg-sky-300 '
            onClick={() => {
              setShowDescription(true);
            }}
          >
            Show description{' '}
          </button>
          <Like idPokemon={idPokemon} likeInicial={isLiked}/>
        </div>
        {showDescription && (
          <div className='absolute bg-gray-100 p-2 rounded-md mt-2 inset-0  items-center '>
            <p>{description}</p>
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
