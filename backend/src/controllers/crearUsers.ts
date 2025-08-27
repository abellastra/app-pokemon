// type user = {
//     email:string;
//     password:string;

// }
import Pool from "../database/connecionPostgresSQL"
import { Request, Response } from "express"
import bcrypt from 'bcrypt'

export const crear = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        // validar que el email ingresado no este registrado
        console.log('crear user del lado del backend ', email)

        const result = await Pool.query('SELECT * FROM usuarios WHERE user_email = $1', [email])
        if (result.rowCount === 0) {
             // si no esta registrado hashear el password
            const passwordHas = await bcrypt.hash(password, 10)
            await Pool.query(
                "INSERT INTO usuarios (user_email, user_password) VALUES ($1, $2)",
                [email, passwordHas]
            );


            console.log('se registro el user')
            return res.status(201).json({ msg: "Usuario registrado correctamente" });
        } else {
            return res.status(400).json({ msg: "El email ya está registrado" });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error del servidor" });
    }



}