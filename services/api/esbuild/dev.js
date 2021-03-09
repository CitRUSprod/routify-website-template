const path = require("path")
const dotenv = require("dotenv")
const { build } = require("./base")

const { parsed: parsedEnvs } = dotenv.config({
    path: path.join(__dirname, "../../../.env")
})

function createProcessEnvs(envs) {
    if (envs) {
        const result = {}

        for (const [key, value] of Object.entries(envs)) {
            result[`process.env.${key}`] = JSON.stringify(value)
        }

        return result
    } else {
        return {}
    }
}

const devConfig = {
    sourcemap: "inline",
    define: {
        ...createProcessEnvs(parsedEnvs),
        "process.env.NODE_ENV": JSON.stringify("development")
    },
    inject: [path.join(__dirname, "sourcemaps.js")]
}

build(devConfig)
