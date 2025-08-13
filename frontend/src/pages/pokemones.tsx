import { useEffect, useState } from 'react';
import Tarjeta from '../components/tarjetaPokemon';
import Pagination from '../components/pagination';

type Pokemon = {
  name: string;
  habilidades: string;
  ataques: string;
  foto: string;
  infoPages: number;
};

function Pokemones() {
  const [listaPokemones, setListaPokemones] = useState<Pokemon[]>([]);
  const [registros, setRegistros] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const limite = 20;
  const totalPag = Math.ceil(registros / limite);
 
  useEffect(() => {
    const offset = (paginaActual - 1) * limite;
    pedirDatosPokemones(offset, limite);
  }, [paginaActual,totalPag]);

  const pedirDatosPokemones = async (offset: number, limite: number) => {
    const response = await fetch(
      `http://localhost:3000/pokemones?offset=${offset}&limit=${limite}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setListaPokemones(data.resultado);
      setRegistros(data.infoPages);
    }
  };

console.log(registros)
  function cambiarPagina(value : number){
  setPaginaActual(value)
  }

  return (
    <div className=' flex flex-col items-center  '>
   
      <Pagination  totalPaginas={totalPag} paginaActual={paginaActual}  siblings={1} cambiar= {cambiarPagina}/>
      <div className='grid grid-cols-5 gap-4 w-[90%] h-[485px] overflow-y-auto overflow-x-hidden  bg-write  '>
        {listaPokemones.map((pokemon) => (
          <Tarjeta
          key={pokemon.name}
            name={pokemon.name}
            habilidades={pokemon.habilidades}
            foto={pokemon.foto}
            // description={pokemon.description}
          />
        ))}
      </div>
    </div>
  );
}
export default Pokemones;
