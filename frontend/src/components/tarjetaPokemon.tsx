
import Like from './botonLike';
import { useTema } from '../context/temaContext';
import { useTranslation } from 'react-i18next';
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
type TarjetaProps = Pokemon & {
  setModalDescripcion: (pokemon: Pokemon | null) => void;
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
  botonVisible,
  setModalDescripcion,
}: TarjetaProps) {
  const { tema } = useTema();
  const { t } = useTranslation();
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
    tema,
    generarColor,
  };

  return (
    <>
      <div
        className={`w-[30%] sm:w-[40%] md:w-[40%] lg:w-[80%] h-[80%] rounded-[4vh] p-[1vh] flex flex-col justify-between
         bg-[rgb(255,255,255)]/7 text-white shadow-xl`}
      >
        <div className='flex justify-center items-center  mb-[1vh]'>
          <h4 className='text-[2vh] font-bold capitalize'>
            {name}
          </h4>
          <Like
            idPokemon={idPokemon}
            likeInicial={isLiked}
            botonVisible={botonVisible}
          />
        </div>

        <div className='bg-[#8a8989ff]/10 w-full h-[25vh] flex justify-center items-center rounded-[2vh] mb-[1vh]'>
          <img className='w-[25vh] h-[25vh]' src={img} alt={name} />
        </div>

        <div className='flex flex-wrap justify-center gap-[1vh] mb-[1vh]'>
          {ability?.slice(0, 2).map((ab: string, index: number) => (
            <span
              key={index}
              className={`${generarColor(ab)} px-[1vh] py-[0.5vh] text-[1.5vh] font-semibold rounded-full whitespace-nowrap`}
            >
              {ab}
            </span>
          ))}
        </div>


        <h5 className='text-[1.8vh] font-medium mb-[0.5vh] text-center'>
          {t("generacion")} {generation.toUpperCase()}
        </h5>

        <p className='text-[1.5vh] mb-[1vh] text-center line-clamp-1'>
          {description}
        </p>

        <button
          className='bg-blue-800 text-white py-[1vh] m-[1vh] rounded-[1vh] hover:bg-blue-900 text-[1.5vh]'
          onClick={() => setModalDescripcion(dataPokemon)}
        >
          {t("Ver más")}
        </button>
      </div>
    </>
  );
}
export default Tarjeta;
