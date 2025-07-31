function Home (){
    const pedirDatosPokemones = async () => {
        const response: Response = await fetch("http://localhost:3000/datosPokemones",{
            method: "GET",
            headers: {
                "content-type": "aplication-json"
            },
            body: JSON.stringify({}),
        })
        if(response.ok){
            const data = response.json()
            console.log(data)
            // aca tendria que navegar a las tarjetas y pasarle los datos para 
            // llenarlas
        }
    }
    return(
        <>
        <header className="">
            <h1 className=" flex justify-center text-center bg-gradient-to-b from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent font-bold text-4xl mt-5">Pokemones</h1>

    
        <main className="py-4 px-4 pb-16 max-w-xl mx-auto min-h-dvh mt-14">
            
           
         <button className="w-36 bg-amber-400 border border-black rounded-3xl 
  flex justify-center mx-auto" onClick={() => pedirDatosPokemones}>Generar</button>
        

        </main>
        
        </header>
        </>
    )
    
}
export default Home