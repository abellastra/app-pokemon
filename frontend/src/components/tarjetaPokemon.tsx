import { useState } from 'react';
import Like from './botonLike';
type Pokemon = {
  name: string;
  idPokemon:number;
  ability: string;
  img: string;
  description: string;
  attacks: string;
  generation: string;
  types: string;
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

  return (
    // <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full">
    <div className='  flex justify-center items-center bg-white rounded-lg shadow-md h-80  w-50  '>
      <div className=' relative flex flex-col  items-center  h-full w-full  '>
        <h4 className=''>{name}</h4>
        <h5 className=''>{types}</h5>
        <img className='w-25 h-25' src={img} alt='' />
        <h5>{ability}</h5>
        <h5>Generation {generation.toUpperCase()}</h5>

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
