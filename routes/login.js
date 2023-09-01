import { Router } from "express";
import { generarToken } from "../helpers/token/token.js";

let appLogin = Router()

appLogin.post("/", generarToken) //Enrutar el login con el app

export default appLogin