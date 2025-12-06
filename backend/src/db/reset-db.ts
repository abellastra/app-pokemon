import { db } from './index.js';
import { acciones, usuarios } from './schema.js';
import { randomUUID } from 'crypto';

async function main() {
  const uuid = randomUUID();

  // Borrar primero las tablas dependientes
  await db.delete(acciones);
  await db.delete(usuarios);

  // Insertar datos base
  await db.insert(usuarios).values([
    {
      id_user: uuid,
      user_name: 'admin', // ✅ corregido
      user_email: 'admin@gmail.com',
      user_password: 'admin11',
    },
  ]);

  await db
    .insert(acciones)
    .values([{ pokemon_id: 1, user_id: uuid, like_foto: true }]);

  console.log('Base de datos reseteada correctamente');
}

main().catch(err => {
  console.error('Error al resetear la base de datos:', err);
});
