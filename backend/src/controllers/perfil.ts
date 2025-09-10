import { Request, Response } from "express";
import Pool from "../database/connecionPostgresSQL";

export const pf = async (req: Request, res: Response) => {
    const email_usuario = req.usuario?.email

    if (!email_usuario) {
        return res.status(400).json({ msg: "No se proporcionó el email del usuario" });
    }

    try {
        const result = await Pool.query('SELECT id_user FROM usuarios WHERE user_email = $1', [email_usuario])

        if (result.rowCount === 0) {
            return res.status(401).json({ msg: "No se encontro el usuario" });
        }
        res.status(201).json({ ok: true })
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({ ok: false ,msg: "Error del servidor" });
    }
}