import cors from 'cors';
import express from 'express';

import { getPokemones } from './controllers/pokemones';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/pokemones', getPokemones);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
