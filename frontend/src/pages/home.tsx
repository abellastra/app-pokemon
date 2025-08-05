import Pokemones from './pokemones';

function Home() {
  return (
    <>
      <header className=''>
        <h1 className=' flex justify-center text-center bg-gradient-to-b from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent font-bold text-4xl mt-5'>
          Pokemones
        </h1>

        <main className='py-4 px-4 pb-16 max-w-xl mx-auto min-h-dvh mt-14'>
          <Pokemones />
        </main>
      </header>
    </>
  );
}
export default Home;
