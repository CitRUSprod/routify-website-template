const path = require("path")
const { build } = require("./base")

const devConfig = {
    sourcemap: "inline",
    define: {
        "process.env.NODE_ENV": JSON.stringify("development")
    },
    inject: [path.join(__dirname, "sourcemaps.js")]
}

build(devConfig)
