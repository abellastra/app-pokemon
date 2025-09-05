import { useState } from 'react';
import Like from './botonLike';
type Pokemon = {
  name: string;
  ability: string;
  img: string;
  description: string;
  attacks: string;
  generation: string;
};
function Tarjeta({ name, ability, img ,description ,attacks,generation}: Pokemon) {
  

 const [showDescription, setShowDescription] = useState<boolean>(false);
  return (
    // <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full">
    <div className='  flex justify-center items-center bg-white rounded-lg shadow-md  w-[200px]'>
      <div className=' relative flex flex-col  items-center  h-[230px] w-full  '>
        <h4 className=''>{name}</h4>
        <img className='w-[96px] h-[96px]' src={img} alt='' />
        <h5>{ability}</h5>
        <h5>Generation {generation.toUpperCase()}</h5>
        <button
          className='bg-sky-200 p-1 rounded-md hover:bg-sky-300 '
          onClick={() => {
            setShowDescription(true);
          }}
        >
          Show description{' '}
        </button>
        {showDescription && (
          <div className='absolute bg-gray-100 p-2 rounded-md mt-2 inset-0  items-center ' >
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
      <Like />
    </div>
  );
}
export default Tarjeta;
