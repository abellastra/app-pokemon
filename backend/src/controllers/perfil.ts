import { Request, Response } from 'express';
import { usuarios } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '../../db';

export const pf = async (req: Request, res: Response) => {
  const email_usuario = req.usuario?.email;

  if (!email_usuario) {
    return res
      .status(400)
      .json({ msg: 'No se proporcionó el email del usuario' });
  }

  try {
    const result = await db
      .select({
        id_user: usuarios.id_user,
      })
      .from(usuarios)
      .where(eq(usuarios.user_email, email_usuario));

    if (result.length === 0) {
      return res.status(401).json({ msg: 'No se encontro el usuario' });
    }
    res.status(201).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error del servidor :', error });
  }
};
