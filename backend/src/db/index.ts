import { drizzle } from 'drizzle-orm/node-postgres';
import Pool from '../../src/database/connecionPostgresSQL.js'; 
import * as schema from './schema.js';

export const db = drizzle(Pool, { schema });
