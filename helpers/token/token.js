import { SignJWT, jwtVerify } from "jose";
import { my_jwt } from "../../config/variables/variables.js";
import { con } from '../../config/connect/connect.js';
import { ObjectId } from "mongodb";

let db = await con();

export let generarToken = async(req, res, next) => {
    if(Object.keys(req.body).length === 0) return res.status(200).send({status: 402, message: "No ha enviado los datos pertinentes"})

    let { User, Password } = req.body;

    let data = await db.collection("roles").findOne(
        {
            user: User, password: Password
        }
    )

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

        let res = await db.collection("roles").findOne(
            {
                _id: new ObjectId(jwtData.payload.data._id),
                [`permisos.${req.baseUrl}`]: `${req.headers["accept-version"]}`
            }
        )

        let { _id, permisos, ...usuario} = res;

        return usuario;

    } catch (error) {
        return false;
    }
}