import cors from 'cors';
import express from 'express';
import useRouters from './routers/useRouters';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use('/', useRouters);

app.get('/', (req, res) => {
  res.send('Backend funcionando ✅');
});

export default app;
