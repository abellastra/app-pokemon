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
  const [items, setItems] =useState<JSX.Element[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
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
      setRegistros(data.infoPages)
    }
  };

 
   

   useEffect(() =>{
    const totalPag = Math.ceil(registros / limite);
    const nuevosItems = []
    for(let i = 1; i <= totalPag; i++){
      nuevosItems.push(
          <li className="page-item" key={i}>
          <a className="page-link" href="#"  onClick={(e) => {;
            e.preventDefault();
            setPaginaActual(i);
          }}>{i}</a>
        </li>)
    }
    setItems(nuevosItems);
   },[registros])
  

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
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {items}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
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
