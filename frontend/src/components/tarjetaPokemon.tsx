type Pokemon = {
  name: string;
  habilidades: string;
  foto: string;
  // description: string;
};
function Tarjeta({ name, habilidades, foto, /**description */ }: Pokemon) {
  return (
    // <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full">
    <div className='  flex justify-center items-center bg-white rounded-lg shadow-md  w-[200px]'>
      <div className='flex flex-col  items-center  h-[230px] w-full  ' >
        <h4 className="">{name}</h4>
        <img className="w-[96px] h-[96px]" src={foto} alt='' />
        <h5>{habilidades}</h5>
      </div>
    </div>
  );
}
export default Tarjeta;
