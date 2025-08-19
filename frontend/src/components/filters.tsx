import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tarjeta from './tarjetaPokemon';
import Pagination from './pagination';
type pokemon = {
    name: string;
    ability: string;
    img: string;
    description: string;
    attacks:string,
    generation:string

};
function Filters() {
  const [selectedGeneration, setSelectedGeneration] = useState(Number);
  const [listPokemones, setListPokemones] = useState<pokemon[]>([]);
  const [paginaActual,setPaginaActual] = useState(1)
  const pagesTotal = Math.ceil(listPokemones.length / 20); //paginas a mostrar
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedGeneration >= 1 && selectedGeneration <= 6) {
      pokemonesForGeneration();
    }
  }, [selectedGeneration]);

  const pokemonesForGeneration = async () => {
    const response = await fetch(
      `http://localhost:3000/pokemones/generation/${selectedGeneration}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setListPokemones(data.resultado);
      console.log(data.resultado);
    }
    console.log(response);
  };
  function cambiarPagina(value: number) {
    setPaginaActual(value);
  }

  return (
    <div className=' flex flex-wrap gap-4 justify-center items-center mb-4'>
      <label className='block text-center bg-sky-200 m-1 p-2  rounded-xl'>
        Type:
        <select name='selectedType'>
          <option value='Normal'>Normal</option>
          <option onChange={() => {}} value='Pighting'>
            Pighting
          </option>
          <option value='Poison'>Poison</option>
        </select>
      </label>
      <label className='block text-center  bg-sky-200 p-2   rounded-xl'>
        Generation:
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            navigate('/pokemones/generation/' + e.target.value);
            setSelectedGeneration(Number(e.target.value));
          }}
          name='selectedGeneracion'
        >
          <option></option>

          <option value={1}>I</option>
          <option value={2}>II</option>
          <option value={3}>III</option>
          <option value={4}>IV</option>
          <option value={5}>V</option>
          <option value={6}>VI</option>
        </select>
      </label>
      <Pagination totalPaginas={pagesTotal} paginaActual={paginaActual} siblings={1} cambiar={cambiarPagina}/>

      {listPokemones.map(pokemon => (
        <Tarjeta
          key={pokemon.name}
          name={pokemon.name}
          ability={pokemon.ability}
          img={pokemon.img}
          description={pokemon.description}
          attacks={pokemon.attacks}
          generation={pokemon.generation}
        />
      ))}

      {/* {listPokemones.map(pokemon => (
        // <Tarjeta
        //   key={pokemon.name}
        //   name={pokemon.name}
        //   habilidades={pokemon.habilidades}
        //   foto={pokemon.foto}
        //   description={pokemon.description}
        //   generation={pokemon.generation}
        // />
      ))} */}
    </div>
  );
}
export default Filters;
