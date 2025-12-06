import express, { Request, Response, NextFunction } from 'express';
import useRouters from './routers/useRouters.js';

const app = express();

app.use(express.json());

const allowedOrigins = new Set<string>([
  'http://localhost:5173',
  'https://app-pokemon-x2ha.vercel.app',
]);

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string | undefined;

  if (origin && allowedOrigins.has(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    // Para que el proxy/cache tenga en cuenta el Origin
    res.header('Vary', 'Origin');

    // Necesario para cookies
    res.header('Access-Control-Allow-Credentials', 'true');

    res.header(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  }

  // Manejar preflight acá mismo
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// (opcional) para ver qué llega realmente
app.use((req, _res, next) => {
  console.log('> ', req.method, req.path, 'Origin:', req.headers.origin);
  next();
});

app.use('/', useRouters);

app.get('/', (_req, res) => {
  res.send('Backend funcionando ✅');
});

export default app;
