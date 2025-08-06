
import{ Request, Response } from 'express';
export const pokemonName=async (req:Request, res:Response) => {
try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`);

    if (response.ok){
        const data =await response.json()

           const habilidades = data.abilities
           console.log(habilidades.map((a:any) => a.ability.name).join(', '));
        
        res.status(200).json(data)
    }
    
} catch (error) {
    res.status(500).json({messaje:"Not found pokemon by name"})
    
}

}