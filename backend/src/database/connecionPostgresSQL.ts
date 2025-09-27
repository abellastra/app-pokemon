import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config(); 
dotenv.config({ path: "../../.env" });

const Pool = new pg.Pool({
 host: process.env.DB_HOST ,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true',
  ...(process.env.DB_PORT ? { port: Number(process.env.DB_PORT) } : {}),
})

export default Pool;