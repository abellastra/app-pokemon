import { Request, Response } from "express";
import Pool from "../database/connecionPostgresSQL";


export const guardarLike = async (req: Request, res: Response) => {
    const { idPokemon, statusPhoto } = req.body
    
    const email_usuario = req.usuario?.email;
    try {
        const result = await Pool.query('SELECT id_user FROM usuarios WHERE user_email = $1', [email_usuario])

        if (result.rowCount === 0) {
            return res.status(401).json({ msg: "No se encontro el id del usuario" });
        }
       
        const id_user = result.rows[0].id_user
        const insertLike = await Pool.query('SELECT like_foto FROM acciones WHERE pokemon_id = $1 AND user_id = $2', [idPokemon, id_user])

        // el usuario dio me gusta anteriormente?
        if (insertLike.rowCount === 0) {
            await Pool.query('INSERT INTO acciones (pokemon_id, user_id, like_foto) VALUES ($1, $2, $3)', [idPokemon, id_user, statusPhoto])
        } else {
            const valorActual = insertLike.rows[0].like_foto
            const nuevoValor = !valorActual
            await Pool.query('UPDATE acciones SET like_foto = $1 WHERE pokemon_id = $2 AND user_id = $3',[nuevoValor, idPokemon, id_user] )
        }


        res.status(200).json({ ok: true })

    } catch (error) {
        console.error("Error al guardar like:", error);
        res.status(500).json({ ok: false, msg: "Error interno del servidor" });
    }
}