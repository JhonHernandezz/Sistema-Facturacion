import { SignJWT, jwtVerify } from "jose";
import { my_jwt } from "../../config/variables/variables.js";
import { con } from '../../config/connect/connect.js';
import { ObjectId } from "mongodb";

let db = await con();

export let generarToken = async(req, res, next) => {
    if(Object.keys(req.body).length === 0) return res.status(200).send({status: 402, message: "No ha enviado los datos pertinentes"})

    const { User, Password } = req.body;

    //Generar la consulta de que si el usuario y la contraseña son correctos

    if(!data) return res.status(200).send({status: 402, message: "El usuario o la contraseña estan incorrectos"})
    
    const encoder = new TextEncoder();
    
    const createToken = await new SignJWT({data})
    .setProtectedHeader({alg: "HS256", typ: "JWT"})
    .setIssuedAt()
    .setExpirationTime("30h")
    .sign(encoder.encode(my_jwt))

    res.status(200).send({status: 200, message: "Bearer " + createToken})

    next()
}

export let validarToken = async(req, token) => {
    try {
        const encoder = new TextEncoder()
        const jwtData = await jwtVerify(token, encoder.encode(my_jwt))

        //Generar la consulta y comprobar 
        //EL ID y los permisos

        let { _id, permisos, ...usuario} = res;

        return usuario;

    } catch (error) {
        return false;
    }
}