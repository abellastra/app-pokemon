import { config } from 'dotenv';
config();

import type { Knex } from 'knex';

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === 'true',
    },
    migrations: {
      directory: './migrations',
      extension: 'ts', 
    },
  },
};

export default knexConfig;