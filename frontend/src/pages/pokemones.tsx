import { useEffect } from "react";

function Pokemones(){
    useEffect(() => {
        pedirDatosPokemones();
    },[])
 const pedirDatosPokemones = async () => {
   const response = await fetch("http://localhost:3000/pokemones", {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
     },
   });
   if (response.ok) {
     const data = await response.json();
     console.log(data);
     // aca tendria que navegar a las tarjetas y pasarle los datos para
     // llenarlas
   }
 };



    return(
         <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full">
                <a className="relative rounded-3xl overflow-hidden
                bg-gradient-to-br from-cyan-950 via-cyan-700
                 to-cyan-500
                 border border-cyan-900
                 flex flex-col items-start
                 hover:scale-105 hover:contrast-125
                 transition
                 col-span-1 p-7  min-h-[180px]
                 group">
                    
                </a>

                <a className="relative rounded-3xl overflow-hidden
                bg-gradient-to-br from-amber-900 via-amber-700
                 to-amber-500
                 border border-amber-900
                 flex flex-col items-start
                 hover:scale-105 hover:contrast-125
                 transition
                 col-span-1 p-7  min-h-[180px]
                 group">
                    
                </a>
                <a className="relative rounded-3xl overflow-hidden
                bg-gradient-to-br from-amber-900 via-amber-700
                 to-amber-500
                 border border-amber-900
                 flex flex-col items-start
                 hover:scale-105 hover:contrast-125
                 transition
                 col-span-1 p-7  min-h-[180px]
                 group">
                    
                </a>

                <a className="relative rounded-3xl overflow-hidden
                bg-gradient-to-br from-fuchsia-950  via-fuchsia-700
                 to-fuchsia-500
                 border border-fuchsia-900
                 flex flex-col items-start
                 hover:scale-105 hover:contrast-125
                 transition
                 col-span-1 p-7  min-h-[180px]
                 group">
                    
                </a>

                <a className="relative rounded-3xl overflow-hidden
                bg-gradient-to-br from-green-900 via-green-700
                 to-green-500
                 border border-green-900
                 flex flex-col items-start
                 hover:scale-105 hover:contrast-125
                 transition
                 col-span-1 p-7  min-h-[180px]
                 group">
                   
                </a>
            </div>
    )
}
export default Pokemones