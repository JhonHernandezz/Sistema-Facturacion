import { Router } from "express";
import passport from '../helpers/token/passportHelps.js';
import { limit } from "../helpers/limit/limit.js";
import { version } from "../config/variables/variables.js";

import { animalsAll } from "../versiones/v1/animales.js";
import { animalsV2All } from "../versiones/v2/animales.js";

const appAnimales = Router();

appAnimales.use(limit(), passport.authenticate("bearer", { session: false }));

appAnimales.get("/", version({
    "1.0.0": animalsAll,
    "2.0.0": animalsV2All  //Esto asigna las versiones que se estan consultando 
  })
);

export default appAnimales