import Pool from "../database/connecionPostgresSQL"
import { Request, Response } from "express"
import bcrypt from 'bcrypt'

export const crear = async (req: Request, res: Response) => {
    const { email, password,userName } = req.body
    try {
        // validar que el email ingresado no este registrado
        console.log('crear user del lado del backend ', email)
        console.log('passwor',password)
        console.log(userName)

        const result = await Pool.query('SELECT * FROM usuarios WHERE user_email = $1', [email])
        if (result.rowCount === 0) {
             // si no esta registrado hashear el password
            const passwordHas = await bcrypt.hash(password, 10)
            //inserto el usuario
            await Pool.query(
                "INSERT INTO usuarios (user_email, user_password,user_Name) VALUES ($1, $2,$3)",
                [email, passwordHas,userName]
            );

            return res.status(201).json({ ok: true, message: "Usuario registrado correctamente" });
        } else {
            return res.status(400).json({  message: "El email ya está registrado" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" , error});
    }



}