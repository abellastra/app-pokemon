import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import vector2 from '../assets/vector2.png';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from '../components/filters';
import Paginationp from '../components/pagination';
import Tarjeta from '../components/tarjetaPokemon';
import PokemonBall from '../components/pokemonBall';
import { hayPerfil } from '../services/perfil';
import { obtenerLike } from '../services/obtenerLike';
import PokemonDescription from '../components/pokemonDescription';
import { useTema } from '../context/temaContext';

type Pokemon = {
  name: string;
  idPokemon: number;
  ability: string[];
  attacks: string;
  img: string;
  generation: string;
  description: string;
  types: string[];
  isLiked: boolean;
  botonVisible: boolean;
};

const filterLimiteName = 'limit';
const filterPaginaName = 'pagina';
const filterGenerationName = 'generation';
const filtertype = 'type';

function Pokemones() {
  const [listaPokemones, setListaPokemones] = useState<Pokemon[]>([]);
  const [registros, setRegistros] = useState(0);
  const [serchParams, setSerchParams] = useSearchParams();
  const [errorfilters, setErrorfilters] = useState('');
  const [isLoanding, setIsLoading] = useState(false);
  const [modalDescripcion, setModalDescripcion] = useState<Pokemon | null>(
    null
  );
  const [likes, setLike] = useState<number[]>(() => {
    const likesGuardados = localStorage.getItem('likes');
    return likesGuardados ? JSON.parse(likesGuardados) : [];
  });

  const [perfil, setPerfil] = useState<boolean>(false);

  useEffect(() => {
    const obtenerPerfil = async () => {
      const res = await hayPerfil();
      setPerfil(res);
    };
    obtenerPerfil();
  }, []);

  const pagina = Number(serchParams.get(filterPaginaName) || 1);
  const limite = Number(serchParams.get(filterLimiteName)) || 3;
  const type = serchParams.get(filtertype) || '';
  const generation = serchParams.get(filterGenerationName) || '';

  const totalPag = Math.ceil(registros / limite);
  const { tema } = useTema();

  const pedirDatosPokemones = useCallback(
    async (
      offset: number,
      limite: number,
      type: string,
      generation: string
    ) => {
      const queryParams = new URLSearchParams(serchParams);

      const searchParamsActual = new URLSearchParams(document.location.search);
      const huboCambioFiltros =
        (searchParamsActual.get('type') ?? '') !== type ||
        (searchParamsActual.get('generation') ?? '') !== generation;

      if (type) {
        if (type !== 'all') {
          queryParams.set('type', type);
        } else {
          queryParams.delete('type');
        }
      }

      if (generation) {
        if (generation !== 'all') {
          queryParams.set('generation', generation);
        } else {
          queryParams.delete('generation');
        }
      }

      if (huboCambioFiltros) {
        queryParams.set('offset', '0');
      } else {
        queryParams.set('offset', offset.toString());
      }

      queryParams.set('limit', limite.toString());

      setSerchParams(queryParams);
      setIsLoading(true);

      const response = await fetch(
        `http://localhost:3000/pokemones?${queryParams.toString()}`,

        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({ offset, limite, type, generation }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        setListaPokemones(data.resultado);
        setRegistros(data.infoPages);
        setErrorfilters(data.ereorPokemons || '');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setErrorfilters('Error de conexion');
        // setSerchParams('1');
      }
    },
    [serchParams, setSerchParams, setListaPokemones, setRegistros]
  );

  useEffect(() => {
    const cargarLikes = async () => {
      if (perfil === null) return;
      if (!perfil) {
        setLike([]);
        return;
      }
      const idsPokemonApi = listaPokemones.map(pokemon => pokemon.idPokemon);
      const listaIds = await obtenerLike(idsPokemonApi);
      setLike(listaIds);
      return;
    };

    cargarLikes();
  }, [perfil, listaPokemones]);

  useEffect(() => {
    const offset = (pagina - 1) * limite;
    pedirDatosPokemones(offset, limite, type, generation);
  }, [pagina, limite, type, generation, pedirDatosPokemones]);

  const handleChangeFilters = (filters: string) => {
    const reiniciarPagina = filters !== filterPaginaName;

    return (value: string | number) => {
      setSerchParams({
        ...Object.fromEntries(serchParams.entries()),
        [filters]: value.toString(),
        [filterPaginaName]: reiniciarPagina ? '1' : value.toString(),
      });
    };
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

  return (
    <div className=' flex flex-col items-center justify-center relative w-full h-full '>
      <div className=''>
        <Paginationp
          totalPaginas={totalPag}
          paginaActual={pagina}
          siblings={1}
          cambiar={handleChangeFilters(filterPaginaName)}
          tema={tema}
        />
        <div className='flex flex-col items-center justify-center sm:flex-row items-center gap-4 w-full'>
          <Filters
            type={type}
            generation={generation}
            setSelectedGeneration={handleChangeFilters(filterGenerationName)}
            setSelectedType={handleChangeFilters(filtertype)}
          />
        </div>
      </div>

      {isLoanding && (
        <div className='absolute inset-0 z-50 flex items-center justify-center bg-gray-400/25 '>
          <PokemonBall />
        </div>
      )}
      {errorfilters && <h1 className='text-red-500'>{errorfilters}</h1>}
      <div className='w-[50vh]  flex flex-col items-center justify-center '>
        <div className='w-[60vh]'>
          <button className='swiper-button-prev-custom absolute z-[10] top-1/2 -translate-y-1/2 left-0 lg:left-10 2xl:left-80 h-[10vh] w-[5vw] hover:bg-white/10 rounded-full z-50 flex justify-center items-center'>
            {/* SVG flecha izquierda */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16 text-white'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <button className='swiper-button-next-custom absolute  z-[10] top-1/2 -translate-y-1/2 right-0 lg:right-10 2xl:right-80 h-[10vh] w-[5vw] hover:bg-white/10 rounded-full z-50 flex justify-center items-center'>
            {/* SVG flecha derecha */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16 text-white'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>
        <div className='relative flex  overflow-x-auto mt-[-5vh] w-[90vh] lg:w-[100vh]'>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            spaceBetween={16}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 1 }, // móviles (desde 0px hasta 1024px)
              1024: { slidesPerView: 3 }, // laptops y desktop
            }}
            pagination={{ clickable: true }}
            className='pb-12'
          >
            {listaPokemones.map(pokemon => (
              <SwiperSlide
                key={pokemon.name}
                style={{
                  width: '42%',
                  marginRight: '0px',
                  padding: '0px',
                  margin: '0px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Tarjeta
                  name={pokemon.name}
                  ability={pokemon.ability}
                  img={pokemon.img}
                  description={pokemon.description}
                  generation={pokemon.generation}
                  attacks={pokemon.attacks}
                  types={pokemon.types}
                  idPokemon={pokemon.idPokemon}
                  isLiked={likes.includes(pokemon.idPokemon)}
                  botonVisible={perfil}
                  setModalDescripcion={setModalDescripcion}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {modalDescripcion && (
            <div className='fixed inset-0 bg-black/60 absolute z-[20] flex items-center justify-center'>
              <div className='flex flex-col justify-center items-center '>
                <PokemonDescription
                  dataPokemon={modalDescripcion}
                  generarColor={generarColor}
                  setModalDescripcion={setModalDescripcion}
                />
                <img
                  src={vector2}
                  alt=''
                  className='fixed inset-0 w-full h-[50vh] top-[55vh] z-30'
                />
                ;
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Pokemones;
