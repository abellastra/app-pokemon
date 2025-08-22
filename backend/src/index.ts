import cors from 'cors';
import express from 'express';
import useRouters from './routers/useRouters';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/",useRouters) 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
