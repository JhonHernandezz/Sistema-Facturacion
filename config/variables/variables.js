import dotenv from 'dotenv'
import routesVersioning from 'express-routes-versioning'

dotenv.config()

export const my_config = JSON.parse(process.env.MY_CONFIG)
export const my_connect = JSON.parse(process.env.MY_CONNECT)
export const my_jwt = process.env.MY_JWT
export const version = routesVersioning()