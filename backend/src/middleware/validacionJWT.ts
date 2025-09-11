import { Request, Response,NextFunction } from "express"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { blackList } from "../routers/useRouters";
dotenv.config({ path: "../../.env" });

export const validarJwt = (req: Request, res: Response, next:NextFunction) => {
     const token = req.cookies.jwt

     if(!token){
        return res.status(400).json({ok: false,message:'No hay token'})
        }

     if(blackList.includes(token)){
        return res.status(401).json({msg:  "Token inválido (blacklist)"})
     }
    try {
        const secreto =  process.env.JWT_SECRET

        if(!secreto){
            throw new Error('JWT_SECRET no definido en el .env')
        }
        const validPayload = jwt.verify(token,secreto) as { id: string; email: string; iat: number; exp: number };
        req.usuario = validPayload;
       console.log('Email del usuario:', req.usuario.email);
        next()
    } catch (error) {
       return res.status(400).json({ok: false, message: 'token invalido', error})
    }


}