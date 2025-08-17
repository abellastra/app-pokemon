import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from '../components/filters';
import Pagination from '../components/pagination';
import Tarjeta from '../components/tarjetaPokemon';
import { fetchPokemonsApi, type PokemonApi } from '../services/fetchPokemons';

const filterTypeName = 'type';
const filterGenerationName = 'generation';
const filterPaginaName = 'pagina';

function Pokemones() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [listaPokemones, setListaPokemones] = useState<PokemonApi[]>([]);
  const [registros, setRegistros] = useState(0);

  const limite = 20;
  const type = searchParams.get(filterTypeName) || '';
  const generation = searchParams.get(filterGenerationName)
    ? parseInt(searchParams.get(filterGenerationName) || '0')
    : 0;
  const paginaActual = searchParams.get(filterPaginaName)
    ? parseInt(searchParams.get(filterPaginaName) || '1')
    : 1;

  const totalPag = Math.ceil(registros / limite);

  useEffect(() => {
    const offset = paginaActual * limite;

    fetchPokemonsApi({ offset, limite, type, generation }).then(data => {
      setListaPokemones(data.resultado);
      setRegistros(data.infoPages);
    });
  }, [paginaActual, type, generation]);

  const handleChangeFilter = (filter: string) => {
    return (value: string | number) => {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        [filter]: value.toString(),
      });
    };
  };

  return (
    <div className=' flex flex-col items-center  '>
      <Pagination
        totalPaginas={totalPag}
        paginaActual={paginaActual}
        siblings={1}
        cambiar={handleChangeFilter(filterPaginaName)}
      />

      <Filters
        selectedGeneration={generation}
        selectedType={type}
        setSelectedGeneration={handleChangeFilter(filterGenerationName)}
        setSelectedType={handleChangeFilter(filterTypeName)}
      />

      <div className='grid grid-cols-5 gap-4 w-[90%] h-[485px] overflow-y-auto overflow-x-hidden  bg-write  '>
        {listaPokemones.map(pokemon => (
          <Tarjeta
            key={pokemon.name}
            name={pokemon.name}
            habilidades={pokemon.habilidades}
            foto={pokemon.foto}
            description={pokemon.description}
            generation={pokemon.generation}
          />
        ))}
      </div>
    </div>
  );
}
export default Pokemones;
