import { TypeIcons } from '../contains/typeIcons';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
type PokemonDescriptionProps = {
  dataPokemon: {
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
  generarColor: (ability: string) => string;
  setModalDescripcion: (pokemon: null) => void;
};

function PokemonDescription({
  dataPokemon,
  generarColor,
  setModalDescripcion,
}: PokemonDescriptionProps) {
  const ataquesArray = dataPokemon.attacks.split(',').map(a => a.trim());

  const [visibleCount, setVisibleCount] = useState(5); // mostramos 5 al inicio

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 20); // cada click muestra 5 más
  };
  const handleShowless = () => {
    setVisibleCount(5); // cada click muestra 5 más
  };
  console.log(typeof dataPokemon.types);

  return (
    <div className='text-white '>
      <div className='flex flex-col justify-center items-center'>
        {/* TARJETA DESPLEGADA                                                */}
        <div
          className='w-[70%] md:w-[500px] max-h-[90vh] bg-[#FFFFFF]/40
 flex flex-col   items-center  relative z-[90] rounded-3xl  '
        >
          {/* TARJETA POKEMON  */}
          <div className='  flex flex-col m-4 rounded-3xl'>
            <div className='flex items-center justify-between '>
              <h1 className='text-white text-3xl  capitalize'>
                {dataPokemon.name}
              </h1>
              {/* Types */}

              <button
                onClick={() => {
                  setModalDescripcion(null);
                }}
                className=' text-[50px]  text-semibold text-white     '
              >
                <IoClose />
              </button>
            </div>

            <div className='flex flex-col items-center'>
              <div className=' bg-[rgb(255,255,255)]/40 w-[80%] h-[40%] flex flex-col  justify-center items-center rounded-2xl mb-[4vh] '>
                <img
                  className='w-[30vh] h-[30vh]'
                  src={dataPokemon.img}
                  alt={dataPokemon.name}
                />
              </div>
              <div className='flex justify-between items-center mb-4'>
                <h5 className='text-xl  text-center'>
                  Generación {dataPokemon.generation.toUpperCase()}
                </h5>
                <div className='flex items-center justify-center text-xl gap-2 ml-10'>
                  {dataPokemon.types && (
                    <span>
                      Type :
                      {dataPokemon.types.map((t, i) => (
                        <span key={i}>{TypeIcons[t]} </span>
                      ))}
                    </span>
                  )}
                </div>
              </div>

              <div className='flex flex-col items-center  justify-center gap-2 mb-2'>
                <h2 className='text-lg'>Ability</h2>
                <div className='flex flex-wrap'>
                  {dataPokemon.ability?.map((ab, index) => (
                    <span
                      key={index}
                      className={`${generarColor(
                        ab
                      )} px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap`}
                    >
                      {ab}
                    </span>
                  ))}
                </div>
              </div>

              <div className='flex  flex-col items-center  justify-center gap-2'>
                <h2 className='text-lg'>Descripcion </h2>
                <p className='text-md mb-2  text-center line-clamp-3  ml-4 mr-4'>
                  {dataPokemon.description}
                </p>
              </div>

              <div className='flex flex-col justify-center items-center'>
                <h2 className='text-lg mt-4'>Attacks</h2>
                <div className='flex flex-wrap justify-center items-center gap-2 mb-2 h-[10vh] overflow-y-auto'>
                  {ataquesArray?.slice(0, visibleCount).map((attack, index) => (
                    <span
                      key={index}
                      className={`${generarColor(attack)} bg-green-300/70 text-black px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap`}
                    >
                      {attack}
                    </span>
                  ))}

                  {visibleCount < ataquesArray.length ? (
                    <button
                      onClick={handleShowMore}
                      className='mt-2 px-3 py-1 text-xs font-semibold text-white rounded'
                    >
                      Ver más
                    </button>
                  ) : (
                    <button
                      onClick={handleShowless}
                      className='mt-2 px-3 py-1 text-xs font-semibold text-white rounded'
                    >
                      Ver menos
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    /* */
  );
}
export default PokemonDescription;
