

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Pokemones from "../pages/pokemones";

const Rutas = () => {
    return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
         <Route path="/pokemones" element={<Pokemones/>}/>
    </Routes>
    </BrowserRouter>
    )
}
export default Rutas