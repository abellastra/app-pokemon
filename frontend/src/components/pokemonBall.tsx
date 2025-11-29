import pokeball from '../assets/pokebola.png';
export default function PokemonBall() {
 return (
    <div className="flex flex-col items-center justify-center h-full w-full ">
      <img
        src={pokeball}
        alt="Cargando Pokébola"
        className="w-24 object-contain animate-spin"
      />
      <p className="mt-2 text-gray-600 text-sm">Cargando...</p>
    </div>
  );

}
