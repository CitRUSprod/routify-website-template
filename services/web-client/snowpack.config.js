const isDev = process.env.NODE_ENV === "development"

module.exports = {
    devOptions: {
        open: "none",
        port: 6701,
        output: "stream"
    },
    buildOptions: {
        out: "dist",
        sourcemap: isDev
    },
    optimize: {
        minify: true,
        target: "es2020"
    },
    mount: {
        static: {
            url: "/",
            static: true
        },
        src: "/build",
        ".routify": "/routify"
    },
    alias: {
        "@": "./src",
        "@routify": "./.routify"
    },
    routes: [
        {
            match: "routes",
            src: ".*",
            dest: "/build/template.html"
        }
    ],
    plugins: [
        "@snowpack/plugin-typescript",
        [
            "@snowpack/plugin-run-script",
            {
                cmd: "svelte-check --output human",
                watch: "$1 --watch"
            }
        ],
        "@snowpack/plugin-svelte",
        "snowpack-plugin-hash"
    ]
}
