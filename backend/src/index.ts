
import cors from 'cors';
import express from 'express';
import useRouters from './routers/useRouters.js';
const allowedOrigins = [
  'http://localhost:5173',
  'https://app-pokemon.vercel.app', //  frontend en producción
];
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use('/', useRouters);

app.get('/', (req, res) => {
  res.send('Backend funcionando ✅');
});

export default app;
// import cors from 'cors';
// import express from 'express';
// import useRouters from './routers/useRouters';

// const app = express();
// const port = 3000;

// app.use(express.json());

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// app.use("/", useRouters)
// app.get('/', (req, res) => {
//   res.send('Backend funcionando+ ______________');
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
