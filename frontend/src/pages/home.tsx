import Pokemones from './pokemones';

function Home() {
  return (
    <>
      <header>
        <main className='mx-auto '>
            <label className='block text-center  w-full '>
            Type:
            <select name="selectedType" >
              <option value="Normal">Normal</option>
              <option value="Pighting">Pighting</option>
              <option value="Poison">Poison</option>
            </select>
          </label>
          <Pokemones />
        </main>
      </header>
    </>
  );
}
export default Home;
