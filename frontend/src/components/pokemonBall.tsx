import { Player } from '@lottiefiles/react-lottie-player';
import pokeballAnimation from '../assets/Pokeball loading animation.json';

export default function PokemonBall() {
  return(
    <div className='flex flex-col items-center justify-center h-48'>
      <Player autoplay loop src={pokeballAnimation} className='w-32 h-32' />
      <p className='mt-2 text-gray-600 text-sm'>Cargando...</p>
    </div>
  );
}
