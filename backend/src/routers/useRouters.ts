
import express from "express";
import { getPokemones } from '../controllers/pokemones';
import { pokemonName } from "../controllers/pokemonName";
import { Login } from "../controllers/login";
import { body} from "express-validator";
import { validarCampos } from "../middleware/validacionDeCampos";



const router = express.Router();

router.get('/pokemones', getPokemones);

router.get('/pokemon/:name', pokemonName)

router.post('/login-user', [
    body("correo")
        .notEmpty().withMessage("El correo ingresado no puede estar vacio.")
        .isEmail().withMessage("La direccion de correo debe ser valida."),
    body("contraseña")
        .notEmpty().withMessage("La contraseña ingresada no puede estar vacia.")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
        validarCampos
],
 Login)

export default router;