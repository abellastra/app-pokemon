import cors, { CorsOptions } from 'cors';
import express from 'express';
import useRouters from './routers/useRouters.js';

const app = express();

app.use(express.json());

// MUY IMPORTANTE: orígenes permitidos
const allowedOrigins = [
  'http://localhost:5173',
  'https://app-pokemon-x2ha.vercel.app', // tu front en Vercel
];

// CORS con credentials
const corsOptions: CorsOptions = {
  origin(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// Para preflight de OPTIONS
app.options('*', cors(corsOptions));

// (opcional, pero muy útil para debug)
app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin);
  next();
});

app.use('/', useRouters);

app.get('/', (req, res) => {
  res.send('Backend funcionando ✅');
});

export default app;
