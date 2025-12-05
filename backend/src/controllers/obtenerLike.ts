import { Request, Response } from 'express';
import { db } from '../db';
import { usuarios } from '../db/schema';
import { acciones } from '../db/schema';
import { eq } from 'drizzle-orm';

export const obtenerLike = async (req: Request, res: Response) => {
  const idsPokemonApi = req.body;
  const email_usuario = req.usuario?.email;
  if (!email_usuario) {
    throw new Error('Email de usuario no encontrado en el token');
  } 
   if (!email_usuario) {
    throw new Error('No se enviaron ids de pokemones');
  }
  try {
    const result = await db
      .select({ id_user: usuarios.id_user })
      .from(usuarios)
      .where(eq(usuarios.user_email, email_usuario));

    if (result.length === 0) {
      return res.status(401).json({ msg: 'No se encontro el id del usuario' });
    }

    const id_user = result[0].id_user;
    
    const likeGuardado = await db
      .select({ pokemon_id: acciones.pokemon_id })
      .from(acciones)
      .where(eq(acciones.user_id, id_user));

    const listaIds = likeGuardado.map(row => row.pokemon_id);

    const enComun = listaIds.filter(id => idsPokemonApi.includes(id));

    res.status(200).json({ ok: true, enComun });
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, msg: 'Error interno del servidor:', error });
  }
};
