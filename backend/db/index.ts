import { drizzle } from 'drizzle-orm/node-postgres';
import Pool from '../src/database/connecionPostgresSQL'; 
import * as schema from './schema';

export const db = drizzle(Pool, { schema });
