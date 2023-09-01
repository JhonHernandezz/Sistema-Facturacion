import { check } from "express-validator";

export const validateAnimalsParams = [
    check("id")
    .isInt().withMessage("El parametro 'id' tiene que ser un numero entero")
    .not()
]

export const validateAnimalsBody = [
    check("nombre")
    .isString()
    .not()
    .withMessage("el campo 'nombre' es obligatorio y tiene que ser un string"),

    check("especie")
    .isString()
    .not()
    .withMessage("el campo 'especie' es obligatorio y tiene que ser un string"),

    check("edad")
    .isInt()
    .not()
    .withMessage("el campo 'edad' es obligatorio y tiene que ser un numero entero"),

    check("tipo_alimentacion")
    .isString()
    .not()
    .withMessage("el campo 'tipo_alimentacion' es obligatorio y tiene que ser un string"),

    check("sexo")
    .isString()
    .not()
    .withMessage("el campo 'sexo' es obligatorio y tiene que ser un string"),

    check("altura")
    .isFloat()
    .not()
    .withMessage("el campo 'altura' es obligatorio y tiene que ser un numero entero o flotante"),

    check("peso")
    .isString()
    .not()
    .withMessage("el campo 'peso' es obligatorio y tiene que ser un string"),

    check("zona")
    .isString()
    .not()
    .withMessage("el campo 'zona' es obligatorio y tiene que ser un string"),

    check("habitat")
    .isString()
    .not()
    .withMessage("el campo 'habitat' es obligatorio y tiene que ser un string"),
    
    check("historial_medico")
    .isString()
    .not()
    .withMessage("el campo 'historial_medico' es obligatorio y tiene que ser un string")
]