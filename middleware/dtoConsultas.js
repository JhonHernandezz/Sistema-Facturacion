import { check } from "express-validator";


export const validateConsultasParams = [
    check("nombre_proveedor")
    .isString()
    .not()
    .withMessage("el campo 'nombre_proveedor' es obligatorio y tiene que ser un string"),
]