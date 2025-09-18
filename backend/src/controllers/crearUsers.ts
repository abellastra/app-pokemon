import Pool from "../database/connecionPostgresSQL"
import { Request, Response } from "express"
import bcrypt from 'bcrypt'

export const crear = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const result = await Pool.query('SELECT * FROM usuarios WHERE user_email = $1', [email])
        if (result.rowCount === 0) {
             // si no esta registrado hashear el password
            const passwordHas = await bcrypt.hash(password, 10)
            //inserto el usuario
            await Pool.query(
                "INSERT INTO usuarios (user_email, user_password) VALUES ($1, $2)",
                [email, passwordHas]
            );

            return res.status(201).json({ ok: true, message: "Usuario registrado correctamente" });
        } else {
            return res.status(400).json({  message: "El email ya está registrado" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" , error});
    }



}