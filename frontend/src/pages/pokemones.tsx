import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";


import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from '../components/filters';
import Paginationp from '../components/pagination';
import Tarjeta from '../components/tarjetaPokemon';
import PokemonBall from '../components/pokemonBall';
import { hayPerfil } from '../services/perfil';
import { obtenerLike } from '../services/obtenerLike';

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
  botonVisible: boolean
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

  const [likes, setLike] = useState<number[]>(() => {
    const likesGuardados = localStorage.getItem('likes');
    return likesGuardados ? JSON.parse(likesGuardados) : [];
  });


  const [perfil, setPerfil] = useState<boolean>(false)

  useEffect(() => {
    const obtenerPerfil = async () => {
      const res = await hayPerfil();
      setPerfil(res);
    }
    obtenerPerfil()
  }, [])

  const pagina = Number(serchParams.get(filterPaginaName) || 1);
  const limite = Number(serchParams.get(filterLimiteName)) || 3;
  const type = serchParams.get(filtertype) || '';
  const generation = serchParams.get(filterGenerationName) || '';

  const totalPag = Math.ceil(registros / limite);

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

  console.log(listaPokemones)
  useEffect(() => {
    const cargarLikes = async () => {
      if (perfil === null) return;
      if (!perfil) {
        setLike([]);
        return;
      }
      const idsPokemonApi = listaPokemones.map(pokemon => pokemon.idPokemon)
      const listaIds = await obtenerLike(idsPokemonApi);
      setLike(listaIds);
      return;

    };

    cargarLikes();

  }, [perfil, listaPokemones])

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


  return (
    <div className=' flex flex-col items-center justify-center relative w-full h-full '>
      <div>
        <Paginationp
          totalPaginas={totalPag}
          paginaActual={pagina}
          siblings={1}
          cambiar={handleChangeFilters(filterPaginaName)}
        />

        <div className='flex items-center   '>
          <Filters
            type={type}
            generation={generation}
            setSelectedGeneration={handleChangeFilters(filterGenerationName)}
            setSelectedType={handleChangeFilters(filtertype)}
          />
          <label className='bg-[#4181D5] text-white  w-[127px] h-[48px] rounded-xl flex justify-between pt-2 pr-4 pb-2 pl-4 sm:p-2 '>
            <select
              onChange={e =>
                handleChangeFilters(filterLimiteName)(Number(e.target.value))
              }
              className='text-white w-[100px] h-[32px] outline-none bg-[#4181D5]'
              value={String(limite)}
            >
              <option value='3' className='bg-[#0D185B]'>3</option>
              <option value='10' className='bg-[#0D185B]'>10</option>
              <option value='15' className='bg-[#0D185B]'>15</option>
              <option value='20' className='bg-[#0D185B]'>20</option>
            </select>
          </label>
        </div>

        {isLoanding == false && limite > listaPokemones.length && (
          <h1 className='m-4 bg-sky-200 p-2 rounded-xl  '>
            Solo existen {listaPokemones.length} de {limite} con esos filtros
          </h1>
        )}
      </div>

      {isLoanding && (
        <div className='absolute inset-0 z-50 flex items-center justify-center bg-white/30 '>
          <PokemonBall />
        </div>
      )}
      {errorfilters && <h1 className='text-red-500'>{errorfilters}</h1>}
      <div className=' flex overflow-x-auto w-[108vh]'>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}          // separación entre tarjetas
          slidesPerView={3}          // cuántas tarjetas visibles a la vez
          navigation                 // flechas prev/next
          pagination={{ clickable: true }} // puntitos abajo
          style={{ width: "108vh", minHeight: "30vh", maxHeight: "70vh" }}
        >
          {listaPokemones.map((pokemon) => (
            <SwiperSlide key={pokemon.name}>
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
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
export default Pokemones;
