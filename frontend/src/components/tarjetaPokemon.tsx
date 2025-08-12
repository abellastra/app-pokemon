type Pokemon = {
  name: string;
  habilidades: string;
  foto: string;
  // description: string;
};
function Tarjeta({ name, habilidades, foto, /**description */ }: Pokemon) {
  return (
    // <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full">
    <div className='  flex justify-start items-center bg-white rounded-lg shadow-md '>
      <div className='flex flex-col items-start  h-[250px] w-full'>
        <h1>{name}</h1>
        <img src={foto} alt='' />
        <h3>{habilidades}</h3>
      </div>
    </div>
  );
}
export default Tarjeta;
