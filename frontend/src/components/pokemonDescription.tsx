import vector2 from '../assets/vector2.png';
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
};

function  PokemonDescription({ dataPokemon }: PokemonDescriptionProps) {
  return (
    <div className='  flex flex-col absoluted  '>
    
      {/* TARJETA DESPLEGADA                                                */}
      <div className='   flex flex-col  justify-center items-center  '>
        {/* TARJETA POKEMON  */}
        <div className='  flex flex-col items-center  rounded-3xl bg-[#0E1F361A]'>
          {/* FRAME 44 */}
          <div>
            {/* FRAME 43 */}
            <div>
              {/* FRAME 42 */}
              <div>
                {/* FRAME 41 */}
                <div>
                  <h1 className='text-white'>{dataPokemon.name}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}
export default PokemonDescription;
