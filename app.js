import express from "express";
import { my_config } from "./config/variables/variables.js";
import appLogin from "./routes/login.js";
import { limitLogin } from "./helpers/limit/limit.js";

import appConsultas from "./routes/consultas.js";

let app = express()
app.use(express.json())

app.use("/login", limitLogin(), appLogin)
app.use("/consultas", appConsultas)

app.listen(my_config, () => console.log(`http://${my_config.hostname}:${my_config.port}`))