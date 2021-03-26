import { FastifyInstance, FastifyPluginOptions } from "fastify"
import WebSocket from "ws"
import Database from "@/db"
import { UserPayload } from "@/assets/types"

enum WSMessageType {
    Ping = "ping",
    Pong = "pong",
    GChatSentMessage = "g-chat-sent-message",
    GChatReceivedMessage = "g-chat-received-message"
}

interface WSMessageBase {
    type: WSMessageType
    data?: object
}

interface WSMessage extends Record<WSMessageType, WSMessageBase> {
    [WSMessageType.Ping]: {
        type: WSMessageType.Ping
        data?: {}
    }
    [WSMessageType.Pong]: {
        type: WSMessageType.Pong
        data?: {}
    }
    [WSMessageType.GChatSentMessage]: {
        type: WSMessageType.GChatSentMessage
        data: {
            text: string
        }
    }
    [WSMessageType.GChatReceivedMessage]: {
        type: WSMessageType.GChatReceivedMessage
        data: {
            sender: string
            text: string
        }
    }
}

const { UserModel } = Database.models

function sendMessage(socket: WebSocket, message: WSMessage[keyof WSMessage]) {
    socket.send(JSON.stringify(message))
}

export default (
    app: FastifyInstance,
    opts: FastifyPluginOptions,
    done: Function
) => {
    const users = new WeakMap<WebSocket, string>()

    app.get("/", { websocket: true }, async (connection, req) => {
        if (req.cookies.token) {
            try {
                const payload: UserPayload = await app.jwt.verify(
                    req.cookies.token
                )
                users.set(connection.socket, payload.id)
            } catch (err) {}
        }

        connection.socket.on("message", async (msgJson: string) => {
            const message: WSMessage[keyof WSMessage] = JSON.parse(msgJson)

            switch (message.type) {
                case WSMessageType.Ping: {
                    sendMessage(connection.socket, {
                        type: WSMessageType.Pong
                    })

                    break
                }

                case WSMessageType.GChatSentMessage: {
                    const userId = users.get(connection.socket)

                    if (userId) {
                        const user = await UserModel.findById(userId)

                        if (user) {
                            const { clients } = app.websocketServer

                            for (const client of clients) {
                                if (client.readyState === WebSocket.OPEN) {
                                    sendMessage(client, {
                                        type:
                                            WSMessageType.GChatReceivedMessage,
                                        data: {
                                            sender: user.username,
                                            text: message.data.text
                                        }
                                    })
                                }
                            }
                        }
                    }

                    break
                }
            }
        })
    })

    done()
}
