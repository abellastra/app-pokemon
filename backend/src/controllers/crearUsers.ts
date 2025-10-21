import Pool from '../database/connecionPostgresSQL';
import { db } from '../../db/index';
import { usuarios } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const crear = async (req: Request, res: Response) => {
  const { email, password, userName } = req.body;
  // Pool.query('SELECT * FROM usuarios WHERE user_email = $1', [email])
  try {
    const result = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.user_email, email));
    if (result.length === 0) {
      // si no esta registrado hashear el password
      const passwordHas = await bcrypt.hash(password, 10);
      //inserto el usuario
      //   Pool.query(
      //     'INSERT INTO usuarios (user_email, user_password,user_Name) VALUES ($1, $2,$3)',
      //     [email, passwordHas, userName]
      await db.insert(usuarios).values({
        user_email: email,
        user_password: passwordHas,
        user_Name: userName,
      });

      return res
        .status(201)
        .json({ ok: true, message: 'Usuario registrado correctamente' });
    } else {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor', error });
  }
};
