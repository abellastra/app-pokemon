import { Request, Response,NextFunction } from "express"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: "../../.env" });

export const validarJwt = (req: Request, res: Response, next:NextFunction) => {
    try {
        const token = req.cookies.jwt
        const secreto =  process.env.JWT_SECRET

        if(!token){
            res.status(400).json({ok: false,message:'No hay token'})
        }
        if(!secreto){
            throw new Error('JWT_SECRET no definido en el .env')
        }
        const validPayload = jwt.verify(token,secreto)
        console.log(validPayload)
        next()
    } catch (error) {
        res.status(400).json({ok: false, message: 'token invalido', error})
    }


}