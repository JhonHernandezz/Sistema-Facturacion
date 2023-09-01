import { con } from "../../config/connect/connect.js";

let db = await con();

//Crear la conexion a la coleccion respectivamente

export const animalsAll = async (req, res) => {
    try {
        
        //Falta hacer la consulta a la coleccion de animales

        res.send(data);

    } catch (error) {
      res.status(400).send({ status: 400, message: error });
    }
};