import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from '../components/filters';
import Pagination from '../components/pagination';
import Tarjeta from '../components/tarjetaPokemon';
type Pokemon = {
  name: string;
  ability: string;
  attacks: string;
  img: string;
  generation: string;
  description: string;
};

const filterLimiteName = 'limit';
const filterPaginaName = 'pagina';
const filterGenerationName = 'generation';
const filtertype = 'type';

function Pokemones() {
  const [listaPokemones, setListaPokemones] = useState<Pokemon[]>([]);
  const [registros, setRegistros] = useState(0);
  const [serchParams, setSerchParams] = useSearchParams();

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

      console.log('huboCambioFiltros', { huboCambioFiltros, type, generation });

      if (huboCambioFiltros) {
        queryParams.set('offset', '0');
      } else {
        queryParams.set('offset', offset.toString());
      }

      queryParams.set('limit', limite.toString());

      setSerchParams(queryParams);
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
        console.log(data, 'data');

        setListaPokemones(data.resultado);
        setRegistros(data.infoPages);
      }
    },
    [serchParams, setSerchParams, setListaPokemones, setRegistros]
  );

  useEffect(() => {
    const offset = (pagina - 1) * limite;

    console.log('offset', { pagina, limite, offset });

    pedirDatosPokemones(offset, limite, type, generation);
  }, [pagina, limite, type, generation, pedirDatosPokemones]);

  const handleChangeFilters = (filters: string) => {
    const reiniciarPagina = filters !== filterPaginaName;

    return (value: string | number) => {
      console.log('reiniciarPagina', {
        reiniciarPagina,
        filters,
        filterPaginaName,
      });

      setSerchParams({
        ...Object.fromEntries(serchParams.entries()),
        [filters]: value.toString(),
        [filterPaginaName]: reiniciarPagina ? '1' : value.toString(),
      });
    };
  };

  return (
    <div className=' flex flex-col items-center  '>
      <Pagination
        totalPaginas={totalPag}
        paginaActual={pagina}
        siblings={1}
        cambiar={handleChangeFilters(filterPaginaName)}
      />

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

      <div className='grid grid-cols-5 gap-4 w-[90%] h-[485px] overflow-y-auto overflow-x-hidden  bg-write  '>
        {listaPokemones.map(pokemon => (
          <Tarjeta
            key={pokemon.name}
            name={pokemon.name}
            ability={pokemon.ability}
            img={pokemon.img}
            description={pokemon.description}
            generation={pokemon.generation}
            attacks={pokemon.attacks}
          />
        ))}
      </div>
    </div>
  );
}
export default Pokemones;
