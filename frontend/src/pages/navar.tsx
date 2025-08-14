
import { useNavigate } from 'react-router-dom';
export default function Navar() {
  const navigate = useNavigate();
  return (
    <header
  
    >
      <h1 className=' flex justify-center text-center bg-gradient-to-b from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent font-bold text-4xl mt-1'>
        Pokemones
      </h1>
    </header>
  );
}
