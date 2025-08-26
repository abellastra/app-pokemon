import { useEffect, useState } from 'react';
import Tarjeta from '../components/tarjetaPokemon';
import Pagination from '../components/pagination';
import Filters from '../components/filters';
import { useSearchParams } from 'react-router-dom';
type Pokemon = {
  name: string;
  ability: string;
  attacks: string;
  img: string;
  generation: string;
  description: string;
};

function Pokemones() {
  const [listaPokemones, setListaPokemones] = useState<Pokemon[]>([]);
  const [registros, setRegistros] = useState(0);
  const [serchParams, setSerchParams] = useSearchParams();

  const filterPaginaName = 'pagina';
  const filterGenerationName = 'generation';
  const filtertype = 'type';

  const paginaActual = Number(serchParams.get('pagina')) || 1;
  const type = serchParams.get('type') || '';
  const generation = serchParams.get('generation') || '';

  const limite = 20;
  const totalPag = Math.ceil(registros / limite);

  useEffect(() => {
    const offset = (paginaActual - 1) * limite;
    pedirDatosPokemones(offset, limite, type, generation);
  }, [paginaActual, totalPag, type, generation]);

  const pedirDatosPokemones = async (
    offset: number,
    limite: number,
    type: string,
    generation: string
  ) => {
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limite.toString(),
      ...(type && { type: type }),
      ...(generation && { generation: generation }),
    });
    const response = await fetch(
      `http://localhost:3000/pokemones?${queryParams}`,

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      console.log(queryParams, 'queryparams');

      const data = await response.json();
      setListaPokemones(data.resultado);
      setRegistros(data.infoPages);
    }
  };

  const handleChangeFilters = (filters: string) => {
    return (value: string | number) => {
      setSerchParams({
        ...Object.fromEntries(serchParams.entries()),
        [filters]: value.toString(),
      });
    };
  };

  return (
    <div className=' flex flex-col items-center  '>
      <Pagination
        totalPaginas={totalPag}
        paginaActual={paginaActual}
        siblings={1}
        cambiar={handleChangeFilters(filterPaginaName)}
      />
      <Filters
        setSelectedGeneration={handleChangeFilters(filterGenerationName)}
        setSelectedType={handleChangeFilters(filtertype)}
      />

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
