import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import useRouters from './routers/useRouters.js';

const app = express();

app.use(express.json());

// ⚠️ DEV ONLY: permite cualquier origin y cookies
const corsOptions: CorsOptions = {
  origin: true,          // refleja el Origin que venga en la request
  credentials: true,     // permite cookies
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight para todos

// (debug opcional)
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log('> ', req.method, req.path, 'Origin:', req.headers.origin);
  next();
});

app.use('/', useRouters);

app.get('/', (_req: Request, res: Response) => {
  res.send('Backend funcionando ✅');
});

export default app;
