
import express from "express";
import { getPokemones } from '../controllers/pokemones';
import { pokemonName } from "../controllers/pokemonName";
import { Login } from "../controllers/login";
import { body} from "express-validator";
import { validarCampos } from "../middleware/validacionDeCampos";
import { crear } from "../controllers/crearUsers";

import { filtersDb } from "../controllers/filters";


const router = express.Router();

router.get('/pokemones', getPokemones);

router.get('/pokemon/:name', pokemonName)

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
router.get(`/pokemones/generation/:selectedGeneration`, filtersDb);

export default router;