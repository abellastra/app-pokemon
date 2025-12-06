import cors from 'cors';
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
const corsOptions = {
  origin: (origin, callback) => {
    // origin puede ser undefined (por ejemplo Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true, // necesario para cookies
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
