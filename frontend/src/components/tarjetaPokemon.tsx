type Pokemon = {
    name: string,

}
function Tarjeta({ name }: Pokemon) {


    return (
        // <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full">
        <div className=" gap-2 w-80 m-7 ">
            <div className="relative rounded-3xl overflow-hidden
                bg-gradient-to-br from-gray-400 via-gray-500
                 to-gray-50
                 border border-gray-900
                 flex flex-col items-start
                 hover:scale-105 hover:contrast-125
                 transition
                 col-span-1 p-7  min-h-[150px]">
                <h2 className="text-xl font-bold">{name}</h2>
                <div className="flex flex-col items-start">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                        alt="pikachu"
                        className=" 
                         object-contain
                         rounded-xl
                         bg-gray-400/50
                         shadow-md
                         backdrop-blur-sm"
                    />
                </div>
                <span id="descripcion">{ }</span>

            </div>

        </div>

    )
}
export default Tarjeta