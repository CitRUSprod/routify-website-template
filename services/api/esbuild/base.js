const { startService } = require("esbuild")

async function build(config = {}) {
    const { dependencies } = require("../package.json")

    const baseConfig = {
        entryPoints: ["./src/main.ts"],
        bundle: true,
        platform: "node",
        outdir: "./dist",
        external: dependencies ? Object.keys(dependencies) : []
    }

    const service = await startService()
    const timeStart = Date.now()

    try {
        await service.build({ ...baseConfig, ...config })

        const timeEnd = Date.now()
        const time = timeEnd - timeStart
        console.log(`Built in ${time}ms.`)
    } catch (err) {
    } finally {
        service.stop()
    }
}

module.exports = { build }
