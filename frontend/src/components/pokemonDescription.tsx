import Like from './botonLike';
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
};

function PokemonDescription({
  dataPokemon,
  generarColor,
}: PokemonDescriptionProps) {
  return (
    <div className='text-white '>
      <div>
        <div></div>;
        {/* TARJETA DESPLEGADA                                                */}
        <div
          className='w-[500px]  h-[80vh] bg-[#FFFFFF33]
 flex flex-col   items-center  relative z-[90] rounded-3xl  '
        >
          {/* TARJETA POKEMON  */}
          <div className='  flex flex-col items-center  rounded-3xl bg-[#0E1F361A]'>
            <div className='flex flex-col items-center mt-[3vh]'>
              <h1 className='text-white text-3xl'>{dataPokemon.name}</h1>
              <div className='flex justify-between items-center mb-2'>
                <Like
                  idPokemon={dataPokemon.idPokemon}
                  likeInicial={dataPokemon.isLiked}
                  botonVisible={dataPokemon.botonVisible}
                />
              </div>
              <h5 className='text-xl mb-1 text-center mt-[2vh] t'>
                Generación {dataPokemon.generation.toUpperCase()}
              </h5>
              <div className=' bg-[rgb(255,255,255)]/40 w-[80%] h-[177px] flex justify-center items-center rounded-2xl mb-[4vh] '>
                <img
                  className='w-[30vh] h-[30vh]'
                  src={dataPokemon.img}
                  alt={dataPokemon.name}
                />
              </div>

              <div className='flex flex-col items-center  justify-center gap-2 mb-2'>
                <h2>Ability</h2>
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
              <div className='flex flex-wrap gap-2 mb-2'>
                {dataPokemon.types && (
                  <span className='bg-sky-300/70 text-black px-2 py-0.5 text-xs font-semibold rounded-full'>
                    {dataPokemon.types}
                  </span>
                )}
              </div>

              <p className='text-xs mb-2  text-center line-clamp-1'>
                {dataPokemon.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    /* */
  );
}
export default PokemonDescription;
