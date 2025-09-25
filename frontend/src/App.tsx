import './App.css';
import Rutas from './routers/routers';
import fondoClaro from './assets/fondo.png';
import fondoOscuro from './assets/fondoOscuro.png'
import { BrowserRouter } from 'react-router-dom';
import {useTema} from'./context/temaContext'
import { Toaster } from "react-hot-toast";

function App() {
  const { tema } = useTema();

  const fondo=tema==='claro'?fondoClaro:fondoOscuro
  return (
    <div className='overflow-hidden  h-screen'>
      <div
        className='h-screen w-screen bg-cover bg-center '
        style={{ backgroundImage: `url(${fondo})` }}
      >
        <BrowserRouter>
          <Rutas />
        </BrowserRouter>

        <Toaster position="top-center" />
      </div>
    </div>
  );
}
export default App;
