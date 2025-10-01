import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import Pool from '../database/connecionPostgresSQL';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { db } from '../../db/index';
import { usuarios } from '../../db/schema';
import { eq } from 'drizzle-orm';
dotenv.config({ path: '../../.env' });

type User = {
  id_user: string;
  user_email: string;
  user_password: string;
  user_Name: string;
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    throw new Error('Email es obligatorio');
  }

  try {
    // hago una consulta para ver si el email ingresado esta registrado en la base de datos
    //  Pool.query('SELECT * FROM usuarios WHERE user_email = $1', [email])
    const result = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.user_email, email));

    // si devuelve 0 es porq no
    if (result.length === 0) {
      return res.status(401).json({ msg: 'No se encontro el usuario' });
    }
    // guardo el usuario si es que hay

    const usuario = result[0];
    console.log(usuario.user_Name);

    //comparo las contraseñas
    const comparePassword = await bcrypt.compare(
      password,
      usuario.user_password
    );
    console.log(comparePassword, 'comparePassword');
    if (comparePassword) {
      const payload = {
        id: usuario.id_user,
        email: usuario.user_email,
        name: usuario.user_Name,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '1d',
      });
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: false, // ponelo en false si estás en localhost sin HTTPS
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/', // para q sea accesible de todos lados
      });
      return res
        .status(200)
        .json({ ok: true, data: payload, msg: 'Usuario encontrado' });
    } else {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ msg: 'Ooops ocurrio un error con el servidor', error });
  }
};
