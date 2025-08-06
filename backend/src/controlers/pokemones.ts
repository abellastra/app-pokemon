import { Request, Response } from "express";
import fetch from "node-fetch";
console.log("Controlador de pokemones cargado /// pokemones.ts");

export const getPokemones = async (req: Request, res: Response) => {
  type PokemonListResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  };

  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=5");
    const data = (await response.json()) as PokemonListResponse;
    const urls = data.results.map((pokemon) => pokemon.url);


    const dataPokemon = await Promise.all(
      urls.map(async (url) => {
         const res = await fetch(url);
            return await res.json();
      })
    );

   const resultado = dataPokemon.map((pokemon: any) => {
      const name = pokemon.name;

      const habilidades = pokemon.abilities.map((a: any) => a.ability.name);
      console.log(habilidades.join(", "));

      const ataques = pokemon.moves.map((m: any) => m.move.name);
      console.log(ataques.join(", "));

      const foto = pokemon.sprites.front_default;
      console.log(foto);

          return {
            name: name,
            habilidades: habilidades.join(", "),
            ataques: ataques.join(", "),
            foto: foto,
          };  

      });
      
 
      res.status(200).json(resultado);

    } catch (error) {
      res.status(500).json({ message: "Error fetching pokemones" });
    }
  };
