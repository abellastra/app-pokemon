
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { blackList } from '../routers/useRouters';
dotenv.config({ path: '../../.env' });


function mostrarExp(exp: number) {
  const fecha = new Date(exp * 1000) // convertir segundos a milisegundos
  return fecha.toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })
}
export const validarJwt = (req: Request, res: Response, next: NextFunction) => {
   const token = req.cookies.jwt

   if (!token) {
      return res.status(401).json({ ok: false, message: 'No hay token' })
   }

   if (blackList.includes(token)) {
      return res.status(401).json({ msg: "Token inválido (blacklist)" })
   }
   try {
      const secreto = process.env.JWT_SECRET

      if (!secreto) {
         throw new Error('JWT_SECRET no definido en el .env')
      }
      const validPayload = jwt.verify(token, secreto) as { id: string; email: string;  iat: number; exp: number };
      req.usuario = validPayload;

      const ahora = Math.floor(Date.now() / 1000)
      const tiempoRestante = validPayload.exp - ahora;

      console.log("Expira en:", mostrarExp(validPayload.exp))
      if (tiempoRestante <= 10) {
         const nuevoToken = jwt.sign(
           { id: validPayload.id, email: validPayload.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
         )
         res.cookie("jwt", nuevoToken, {
            httpOnly: true,
            secure: false, 
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
         });
      }
      next()
   } catch (error) {
      return res.status(400).json({ ok: false, message: 'token invalido', error })
   }

}

