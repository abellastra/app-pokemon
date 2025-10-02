
import express from "express";
import { getPokemones } from '../controllers/pokemones';
import { Login } from "../controllers/login";
import { validarUsuario} from "../middleware/userValidator"
import { crear } from "../controllers/crearUsers";
import { guardarLike } from "../controllers/guardarLike";

import { filtersDb } from "../controllers/filters";
import { validarJwt } from "../middleware/validacionJWT";
import cookieParser from 'cookie-parser';
import { obtenerLike } from "../controllers/obtenerLike";
import { pf } from "../controllers/perfil";
import { logout}  from "../controllers/logout";

export const blackList:string[] = []

const router = express.Router();
router.use(cookieParser());

router.get('/pokemones' ,getPokemones);
router.post('/login-user', validarUsuario,Login)
router.post('/crear-user',validarUsuario,crear)
router.get('/me', validarJwt, pf)
router.put('/like-pokemon', validarJwt, guardarLike)
router.post('/obtener-like', validarJwt, obtenerLike)
router.get('/logout', validarJwt, logout)
router.get(`/pokemones/generation/:selectedGeneration`, filtersDb);

export default router;