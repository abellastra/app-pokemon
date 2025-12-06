
import express from "express";
import { getPokemones } from '../controllers/pokemones.js';
import { Login } from "../controllers/login.js";
import { validarUsuario} from "../middleware/userValidator.js"
import { crear } from "../controllers/crearUsers.js";
import { guardarLike } from "../controllers/guardarLike.js";

import { filtersDb } from "../controllers/filters.js";
import { validarJwt } from "../middleware/validacionJWT.js";
import cookieParser from 'cookie-parser';
import { obtenerLike } from "../controllers/obtenerLike.js";
import { pf } from "../controllers/perfil.js";
import { logout}  from "../controllers/logout.js";

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