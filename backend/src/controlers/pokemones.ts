import { Request, Response } from "express";
import fetch from "node-fetch";
console.log("Controlador de pokemones cargado /// pokemones.ts");
export const getPokemones = async (req: Request, res: Response) => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=6");
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pokemones" });
  }
};
