import { config } from 'dotenv';
config();

import type { Knex } from 'knex';

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './migrations',
      extension: 'ts', 
    },
  },
};

export default knexConfig;