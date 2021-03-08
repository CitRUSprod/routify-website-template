import fastify from "fastify"

const port = 6702

const app = fastify()

app.get("/", (req, reply) => {
    reply.send({
        msg: "Hello world"
    })
})

app.listen(port, "0.0.0.0", err => {
    if (err) throw err
    console.log(`Running on http://localhost:${port}`)
})
