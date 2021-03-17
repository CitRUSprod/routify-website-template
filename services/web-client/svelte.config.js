const path = require("path")
const sveltePreprocess = require("svelte-preprocess")
const { preprocess: windicss } = require("svelte-windicss-preprocess")

module.exports = {
    preprocess: [
        windicss({
            config: path.join(__dirname, "tailwind.config.js"),
            compile: true,
            globalPreflight: true,
            globalUtility: true
        }),
        sveltePreprocess()
    ]
}
