import { rateLimit } from "express-rate-limit";

export const limit = () => {
    return rateLimit(
        {
            windowMs: 30 * 1000,
            max: 10,
            standardHeaders: true,
            legacyHeaders: false,
            message: (req, res) => {
                res.status(202).send({status: 202, message: "Ha alcanzado el limite de solicitudes"})
            }
        }
    )
}

export const limitLogin = () => {
    return rateLimit(
        {
            windowMs: 30 * 1000,
            max: 5,
            standardHeaders: true,
            legacyHeaders: false,
            message: (req, res) => {
                res.status(202).send({status: 202, message: "Ha alcanzado el limite de solicitudes"})
            }
        }
    )
}