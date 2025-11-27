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
  console.log(types, 'tipos')
  return (
    <>
    <div
      className={`mt-2 ml-4 w-[282px] h-[520px] rounded-[28px] shadow-md p-4 flex flex-col justify-between 
  ${tema === 'claro' ? 'bg-white text-black' : 'bg-[rgb(108,108,115)] text-white'}`}
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
        {ability?.map((ab, index) => (
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
        onClick={() => setShowDescription(true)}
      >
        Ver más
      </button>
      
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
            <button
              onClick={() => setShowDescription(false)}
              className='w-[10px] h-[10vh]   text-7xl absolute z-9999   '
            >
              x
            </button>
          </div>
        </div>
      )}
      </>
  );
}
export default Tarjeta;


 