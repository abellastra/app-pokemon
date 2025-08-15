
import express from "express";
import { getPokemones } from '../controllers/pokemones';
import{ pokemonName } from "../controllers/pokemonName";
import { filtersDb } from "../controllers/filters";


const router = express.Router();

router.get('/pokemones', getPokemones);

router.get('/pokemon/:name', pokemonName)

router.get(`/pokemones/generation/:selectedGeneration`, filtersDb);

export default router;