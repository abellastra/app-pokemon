import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  integer,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { use } from 'react';

// Tabla de usuarios
export const usuarios = pgTable('usuarios', {
  id_user: uuid('id_user').defaultRandom().primaryKey().notNull(),
  user_email: varchar('user_email', { length: 255 }).notNull().unique(),
  user_password: varchar('user_password', { length: 255 }).notNull(),
  user_Name: varchar('user_name', { length: 100 }).notNull(),
});

// Tabla de acciones con clave compuesta
export const acciones = pgTable(
  'acciones',
  {
    pokemon_id: integer('pokemon_id').notNull(),
    user_id: uuid('user_id')
      .notNull()
      .references(() => usuarios.id_user),
    like_foto: boolean('like_foto').default(false),
    creado_en: timestamp('creado_en').defaultNow(),
    actualizado_en: timestamp('actualizado_en'),
  },
  acciones => [primaryKey({ columns: [acciones.pokemon_id, acciones.user_id] })]
);
