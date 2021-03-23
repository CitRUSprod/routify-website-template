import mongoose from "mongoose"
import * as models from "./models"

interface Options {
    host: string
    port: number
    username: string
    password: string
    dbName: string
}

export default class Database {
    static readonly models = models

    static connect({ host, port, username, password, dbName }: Options) {
        return mongoose.connect(
            `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
    }

    static close() {
        return mongoose.connection.close()
    }
}
