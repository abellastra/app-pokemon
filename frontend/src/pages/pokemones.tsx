import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from '../components/filters';
import Pagination from '../components/pagination';
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
  const limite = Number(serchParams.get(filterLimiteName)) || 10;
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
        <Pagination
          totalPaginas={totalPag}
          paginaActual={pagina}
          siblings={1}
          cambiar={handleChangeFilters(filterPaginaName)}
        />

               <div className='flex items-center justify-center '>
          <Filters
            type={type}
            generation={generation}
            setSelectedGeneration={handleChangeFilters(filterGenerationName)}
            setSelectedType={handleChangeFilters(filtertype)}
          />
          <select
            onChange={e =>
              handleChangeFilters(filterLimiteName)(Number(e.target.value))
            }
            value={String(limite)}
            className='bg-sky-200 p-2 rounded-xl'
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
            <option value='20'>20</option>
          </select>
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
      <div className='  items-center justify-center   overflow-x-auto scrollbar-thumb-sky-300'>
        <div className='min-h-[30vh] max-h-[70vh]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {/* sm:max-h-[40vh] md:md:max-h-[80vh] lg:min-h-[3 0vh]
          lg:max-h-[70vh] */}
          {listaPokemones.map(pokemon => (
            <Tarjeta
              key={pokemon.name}
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
          ))}
        </div>
      </div>
    </div>
  );
}
export default Pokemones;
