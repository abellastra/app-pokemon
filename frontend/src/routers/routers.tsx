

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";

const Rutas = () => {
    return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home></Home>}/>
    </Routes>
    </BrowserRouter>
    )
}
export default Rutas