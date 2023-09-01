import { con } from "../../config/connect/connect.js";
//Falta hacer el auto increment para todos los archivos "Aprender"
import { validationResult } from "express-validator"; // Express validator 


let db = await con()

// Hacer la conexion a la coleccion generar para todos los metodos 

export const animalsV2All = async (req, res) => {
    try {

        //Aca va la consulta con el metodo ------ para que devuelva los datos
        //Recordar pasar el to...

        res.send(data);

    } catch (error) {
      res.status(400).send({ status: 400, message: error });
    }
};

export const animalsPost = async (req, res) => {
    try {

        let errors = validationResult(req);
        let objErrors = []

        //Esto permite validar los errores de express validator 

        errors.errors.forEach((val) => {
            objErrors.push(val.msg)
        });

        if(!errors.isEmpty()) return res.status(400).json({status: 429, message: objErrors})        

        // Hacer la consulta a la coleccion 
        // Pasar los datos pertinentes 

        res.status(200).send({status: 200, message: "Registro creado con exito"});

    } catch (error) {
        res.status(400).send({ status: 400, message: error });
    }
};

export const animalsPut = async (req, res) => {
    
    try {

        let errors = validationResult(req);
        let objErrors = []

        errors.errors.forEach((val) => {
            objErrors.push(val.msg)
        });

        if(!errors.isEmpty()) return res.status(400).json({status: 429, message: objErrors})    

        let id = req.params.id
        id = parseInt(id)

        //Hacer la consulta para saber si el ID existe, si no existe que le arroge el siguiente error 

        if(!consulta) return res.status(200).send({status:400, message: "Este id no existe"})

        //Hacer la insercion de datos 
            
        return res.status(200).send({status: 200, message: "Registro actualizado con exito"});

    } catch (error) {
      res.status(400).send({ status: 400, message: error });
    }
};

export const animalsDelete = async (req, res) => {
    try {

        let errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(400).json({status: 429, message: errors.errors[0].msg})  

        let id = req.params.id
        id = parseInt(id)

        //Hacer la consulta para saber si el ID existe, si no existe que le arroge el siguiente error 

        if(!consulta) return res.status(200).send({status:400, message: "Este id no existe"})

        // Eliminar el registro dependiendo del ID que se le pase
            
        res.status(200).send({status: 200, message: "Registro eliminado con exito"});

    } catch (error) {
      res.status(400).send({ status: 400, message: error });
    }
};