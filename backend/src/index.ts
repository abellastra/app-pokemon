import express from "express";
import cors from "cors";

import { getPokemones } from "./controlers/pokemones";


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

app.get("/pokemones", getPokemones);

app.listen(port, () => {  console.log(`Server is running at http://localhost:${port}`);
});
