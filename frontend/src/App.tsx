import './App.css';
import Rutas from './routers/routers';
import fondo from './assets/fondo.png';
import { BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className='overflow-hidden  h-screen'>
      <div
        className='h-screen w-screen bg-cover bg-center '
        style={{ backgroundImage: `url(${fondo})` }}
      >
            <BrowserRouter>
        
        <Rutas />
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;
