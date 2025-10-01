import { Request, Response } from 'express';
import Pool from '../database/connecionPostgresSQL';
import { db } from '../../db/index';
import { usuarios } from '../../db/schema';
import { acciones } from '../../db/schema';
import { and, eq, like } from 'drizzle-orm';

export const guardarLike = async (req: Request, res: Response) => {
  const { idPokemon, statusPhoto } = req.body;

  const email_usuario = req.usuario?.email;
  if (!email_usuario) {
    throw new Error('Email de usuario no encontrado en el token');
  }
  try {
    // Pool.query('SELECT id_user FROM usuarios WHERE user_email = $1', [email_usuario])
    const result = await db
      .select({
        id_user: usuarios.id_user,
      })
      .from(usuarios)
      .where(eq(usuarios.user_email, email_usuario));
    if (result.length === 0) {
      return res.status(401).json({ msg: 'No se encontro el id del usuario' });
    }

    const id_user = result[0].id_user;
    // Pool.query('SELECT like_foto FROM acciones WHERE pokemon_id = $1 AND user_id = $2', [idPokemon, id_user])
    const insertLike = await db
      .select({
        like_foto: acciones.like_foto,
      })
      .from(acciones)
      .where(
        and(eq(acciones.pokemon_id, idPokemon), eq(acciones.user_id, id_user))
      );

    // el usuario dio me gusta anteriormente?
    if (insertLike.length === 0) {
      // Pool.query('INSERT INTO acciones (pokemon_id, user_id, like_foto) VALUES ($1, $2, $3)', [idPokemon, id_user, statusPhoto])
      await db.insert(acciones).values({
        pokemon_id: idPokemon,
        user_id: id_user,
        like_foto: statusPhoto,
      });
    } else {
      const valorActual = insertLike[0].like_foto;
      const nuevoValor = !valorActual;
      // Pool.query('UPDATE acciones SET like_foto = $1, actualizado_en = NOW() WHERE pokemon_id = $2 AND user_id = $3',[nuevoValor, idPokemon, id_user] )
      await db
        .update(acciones)
        .set({ like_foto: nuevoValor, actualizado_en: new Date() })
        .where(
          and(eq(acciones.pokemon_id, idPokemon), eq(acciones.user_id, id_user))
        );
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error al guardar like:', error);
    res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
  }
};
