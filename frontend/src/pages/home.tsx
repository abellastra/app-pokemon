import { useNavigate } from "react-router-dom"

function Home() {
    const navegar = useNavigate()
    const irAPokemones = () => {
        navegar("/pokemones");
    };

    return (
        <>
            <header className="">
                <h1 className=" flex justify-center text-center bg-gradient-to-b from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent font-bold text-4xl mt-5">Pokemones</h1>


                <main className="py-4 px-4 pb-16 max-w-xl mx-auto min-h-dvh mt-14">


                    <button className="w-36 bg-amber-400 border border-black rounded-3xl 
  flex justify-center mx-auto" onClick={() => irAPokemones()}>Generar</button>


                </main>

            </header>
        </>
    )

}
export default Home