import { Request, Response } from "express";
import Pool from "../database/connecionPostgresSQL";

export const obtenerLike = async (req: Request, res: Response) => {
    const idsPokemonApi = req.body
    const email_usuario = req.usuario?.email
    try {
        const result = await Pool.query('SELECT id_user FROM usuarios WHERE user_email = $1', [email_usuario])

        if (result.rowCount === 0) {
            return res.status(401).json({ msg: "No se encontro el id del usuario" });
        }

        const id_user = result.rows[0].id_user

        const likeGuardado = await Pool.query('SELECT pokemon_id FROM acciones WHERE user_id = $1 AND like_foto = true', [id_user])

        const listaIds = likeGuardado.rows.map(row => row.pokemon_id)

        const enComun = listaIds.filter(id => idsPokemonApi.includes(id))

        res.status(200).json({ ok: true, enComun })

    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error interno del servidor:", error });
    }

}