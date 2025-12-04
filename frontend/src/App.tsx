import './App.css';
import Rutas from './routers/routers';
import fondoClaro from './assets/fondo.png';

import fondoOscuro from './assets/prueba.png'  /**fondoOscuro.png */
import Fondo2 from './assets/Fondo2.png'
import { BrowserRouter } from 'react-router-dom';
import {useTema} from'./context/temaContext'
import { Toaster } from "react-hot-toast";

function App() {
  const { tema } = useTema();


  const fondo = tema === 'claro' ? Fondo2 : fondoOscuro;
  return (
  <div className="overflow-hidden h-screen relative">
    {/* Fondo difuminado */}
    <div
      className="absolute inset-0 bg-repeat bg-center"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "400px 400px",
        filter: "blur(3px)", // 👈 solo al fondo
      }}
    />

    {/* Contenido encima */}
    <div className="relative z-10">
      <BrowserRouter>
        <Rutas />
      </BrowserRouter>
      <Toaster position="top-center" />
    </div>
  </div>
)};
export default App;
