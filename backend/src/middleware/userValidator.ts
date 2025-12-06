import { validarCampos } from "../middleware/validacionDeCampos.js";
import { body} from "express-validator";

export const validarUsuario = [
    body("email")
        .notEmpty().withMessage("El correo ingresado no puede estar vacio.")
        .isEmail().withMessage("La direccion de correo debe ser valida."),
    body("password")
        .notEmpty().withMessage("La contraseña ingresada no puede estar vacia.")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    validarCampos
]