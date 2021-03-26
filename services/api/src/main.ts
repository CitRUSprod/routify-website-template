import fastify from "fastify"
import auth from "fastify-auth"
import jwt from "fastify-jwt"
import cookie from "fastify-cookie"
import websocket from "fastify-websocket"
import Database from "@/db"
import { authRoute, wsRoute } from "@/routes"

const port = 6702

const app = fastify()

const mongo = {
    host: process.env.MONGO_HOST ?? "localhost",
    port: parseInt(process.env.MONGO_PORT ?? "27017"),
    username: process.env.MONGO_USERNAME as string,
    password: process.env.MONGO_PASSWORD as string,
    dbName: process.env.MONGO_DB_NAME as string
}

const localClientSecret = process.env.LOCAL_CLIENT_SECRET as string

app.register(jwt, { secret: localClientSecret })
    .register(cookie)
    .register(auth)
    .register(websocket)

app.register(authRoute, { prefix: "/auth" })
app.register(wsRoute, { prefix: "/ws" })

Database.connect(mongo)
    .then(() => {
        app.listen(port, "0.0.0.0", err => {
            if (err) throw err
            console.log(`Running on http://localhost:${port}`)
        })
    })
    .catch(err => {
        console.error(err)
    })
