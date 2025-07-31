import { Request,Response } from "express";
export const getPokemones = async (req:Request,res:Response  ) => {
  try {
    // Simulate fetching data from a database or external API
    const pokemones = [
      { id: 1, name: "Pikachu" },
      { id: 2, name: "Charmander" },
      { id: 3, name: "Bulbasaur" },
    ];
    
    res.status(200).json(pokemones);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pokemones" });
  }
}