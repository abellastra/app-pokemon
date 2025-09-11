
import express from "express";
import { getPokemones } from '../controllers/pokemones';
import { Login } from "../controllers/login";
import { body} from "express-validator";
import { validarCampos } from "../middleware/validacionDeCampos";
import { crear } from "../controllers/crearUsers";
import { guardarLike } from "../controllers/guardarLike";

import { filtersDb } from "../controllers/filters";
import { validarJwt } from "../middleware/validacionJWT";
import cookieParser from 'cookie-parser';
import { obtenerLike } from "../controllers/obtenerLike";
import { pf } from "../controllers/perfil";



const router = express.Router();
router.use(cookieParser());
router.get('/pokemones' ,getPokemones);

router.post('/login-user', [
    body("email")
        .notEmpty().withMessage("El correo ingresado no puede estar vacio.")
        .isEmail().withMessage("La direccion de correo debe ser valida."),
    body("password")
        .notEmpty().withMessage("La contraseña ingresada no puede estar vacia.")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
        validarCampos
],
 Login)

router.post('/crear-user', [
    body("email")
        .notEmpty().withMessage("El correo ingresado no puede estar vacio.")
        .isEmail().withMessage("La direccion de correo debe ser valida."),
    body("password")
        .notEmpty().withMessage("La contraseña ingresada no puede estar vacia.")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
        validarCampos
],
crear)
router.get('/me', validarJwt, pf)
router.put('/like-pokemon', validarJwt, guardarLike)
router.get('/obtener-like', validarJwt, obtenerLike)
router.get(`/pokemones/generation/:selectedGeneration`, filtersDb);

export default router;