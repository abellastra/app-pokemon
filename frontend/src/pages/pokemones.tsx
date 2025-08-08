import { useEffect, useState } from 'react';


type Pokemon = {
  name: string;
  habilidades: string;
  ataques: string;
  foto: string;
  infoPages: number;
};

function Pokemones() {
  const [listaPokemones, setListaPokemones] = useState<Pokemon[]>([]);
  const [registros, setRegistros] = useState(0)
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [rangoPagina, setRangoPagina] = useState(0);
  const paginasPorRango = 10;
  const limite = 20



  // useEffect(() => {
  //   pedirDatosPokemones();
  // }, []);
  useEffect(() => {
    const offset = (paginaActual - 1) * limite;
    pedirDatosPokemones(offset, limite);
  }, [paginaActual]);

  const pedirDatosPokemones = async (offset: number, limite: number) => {
    const response = await fetch(`http://localhost:3000/pokemones?offset=${offset}&limit=${limite}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      setListaPokemones(data.resultado);
      setRegistros(data.infoPages);
    }
  }



  useEffect(() => {
    const totalPag = Math.ceil(registros / limite);
    const nuevosItems = []
    for (let i = 1; i <= totalPag; i++) {
      nuevosItems.push(
        <li className="page-item" key={i}>
          <a className="page-link" href="#" onClick={(e) => {
            ;
            e.preventDefault();
            setPaginaActual(i);
          }}>{i}</a>
        </li>)
    }
    setItems(nuevosItems);
  }, [registros])

  const inicio = rangoPagina * paginasPorRango
  const fin = inicio + paginasPorRango;
  const itemsVisibles = items.slice(inicio, fin);
  return (
    <section
      id='tajetas'
      className='py-4 px-4 pb-16 max-w-xl mx-auto min-h-dvh  flex flex-col items-center '
    >

      <div>


        <nav aria-label="Page navigation example">

          <ul className="pagination">
           
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
              <button
              onClick={() => setRangoPagina(prev => Math.max(0, prev - 1))}
              disabled={rangoPagina === 0}
            >
              &laquo;
            </button>
              </a>
            </li>
            {itemsVisibles}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <button
              onClick={() =>
                setRangoPagina(prev =>
                  (prev + 1) * paginasPorRango < items.length ? prev + 1 : prev
                )
              }
              disabled={(rangoPagina + 1) * paginasPorRango >= items.length}
            >&raquo;</button>
               
              </a>
            </li>
            
          </ul>


        </nav>


      </div>

      <table className="table table-striped-columns">
        <thead>
          <tr>
            <th scope="col">Images</th>
            <th scope="col">Name</th>
            <th scope="col">Skills</th>
            <th scope="col">Attacks</th>
          </tr>
        </thead>
        <tbody>
          {listaPokemones.map((pokemon, index) => (
            <tr key={index}>
              <td><img src={pokemon.foto} alt="Foto" /></td>
              <td>{pokemon.name}</td>
              <td>{pokemon.habilidades}</td>
            </tr>
          ))}


        </tbody>
      </table>

    </section>
  );
}
export default Pokemones;
