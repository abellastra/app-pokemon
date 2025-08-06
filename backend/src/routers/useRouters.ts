
import express from "express";
import { getPokemones } from '../controllers/pokemones';
import{ pokemonName } from "../controllers/pokemonName";


const router = express.Router();

router.get('/pokemones', getPokemones);

router.get('/pokemon/:name', pokemonName)

export default router;