import { useEffect, useState } from 'react';

type Pokemon = {
  name: string;
  habilidades: string;
  ataques: string;
  foto: string;
};

function Pokemones() {
  const [listaPokemones, setListaPokemones] = useState<Pokemon[]>([]);
  useEffect(() => {
    pedirDatosPokemones();
  }, []);
  const pedirDatosPokemones = async () => {
    const response = await fetch('http://localhost:3000/pokemones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      setListaPokemones(data);
      console.log(data);
    }
  };

  return (
    <section
      id='tajetas'
      className='py-4 px-4 pb-16 max-w-xl mx-auto min-h-dvh  flex flex-col items-center '
    >
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
          {listaPokemones.map(pokemon => (
            <tr>
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
