import ReconnectingWebSocket from "reconnecting-websocket"
import type {
    WebSocketEventListenerMap,
    ErrorEvent
} from "reconnecting-websocket/events"

export enum WSMessageType {
    Ping = "ping",
    Pong = "pong",
    GChatSentMessage = "g-chat-sent-message",
    GChatReceivedMessage = "g-chat-received-message"
}

interface WSMessageBase {
    type: WSMessageType
    data?: object
}

export interface WSMessage extends Record<WSMessageType, WSMessageBase> {
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

export interface WSListener<T extends WSMessageType = WSMessageType.Ping> {
    open: () => void
    close: () => void
    error: (error: ErrorEvent["error"]) => void
    message: (data: WSMessage[T]["data"]) => void
}

export interface WSListenerOptions {
    once: boolean
}

export interface WSClientOptions {
    startPolling: boolean
    pollingTimeout: number
}

export class WSClient {
    static readonly CONNECTING = ReconnectingWebSocket.CONNECTING
    static readonly OPEN = ReconnectingWebSocket.OPEN
    static readonly CLOSING = ReconnectingWebSocket.CLOSING
    static readonly CLOSED = ReconnectingWebSocket.CLOSED

    private readonly _ws: ReconnectingWebSocket
    private readonly _options: WSClientOptions
    private readonly _nativeListeners: Partial<WebSocketEventListenerMap> = {}
    private readonly _listeners = {
        open: new Map<WSListener["open"], WSListenerOptions>(),
        close: new Map<WSListener["close"], WSListenerOptions>(),
        error: new Map<WSListener["error"], WSListenerOptions>(),
        message: {} as {
            [type: string]: Map<WSListener["message"], WSListenerOptions>
        }
    }
    private _pollingInterval?: number

    constructor(options: Partial<WSClientOptions> = {}) {
        const defaultOptions: WSClientOptions = {
            startPolling: true,
            pollingTimeout: 30 * 60 * 1000
        }
        this._options = { ...defaultOptions, ...options }

        this._ws = new ReconnectingWebSocket(`ws://${location.host}/api/ws`)

        if (this._options.startPolling) {
            this.startPolling()
        }
    }

    private _on<T extends keyof WebSocketEventListenerMap>(
        type: T,
        listener: WebSocketEventListenerMap[T]
    ) {
        this._ws.addEventListener(type, listener)
        return this
    }

    private _off<T extends keyof WebSocketEventListenerMap>(
        type: T,
        listener: WebSocketEventListenerMap[T]
    ) {
        this._ws.removeEventListener(type, listener)
        return this
    }

    get readyState() {
        return this._ws.readyState
    }

    close() {
        this.stopPolling()
        this._ws.close()
        return this
    }

    reconnect() {
        this._ws.reconnect()

        if (this._options.startPolling) {
            this.startPolling()
        }

        return this
    }

    send(message: WSMessage[keyof WSMessage]) {
        this._ws.send(JSON.stringify(message))

        if (this._pollingInterval !== undefined) {
            this.stopPolling().startPolling()
        }

        return this
    }

    ping() {
        const message: WSMessage[WSMessageType.Ping] = {
            type: WSMessageType.Ping
        }
        this.send(message)
        return this
    }

    startPolling(timeout?: number) {
        if (this._pollingInterval === undefined) {
            this._pollingInterval = window.setInterval(() => {
                if (this.readyState === WSClient.OPEN) {
                    this.ping()
                }
            }, timeout ?? this._options.pollingTimeout)
        }
        return this
    }

    stopPolling() {
        if (this._pollingInterval !== undefined) {
            clearInterval(this._pollingInterval)
            this._pollingInterval = undefined
        }
        return this
    }

    on(
        type: "open",
        listener: WSListener["open"],
        options?: Partial<WSListenerOptions>
    ): this
    on(
        type: "close",
        listener: WSListener["close"],
        options?: Partial<WSListenerOptions>
    ): this
    on(
        type: "error",
        listener: WSListener["error"],
        options?: Partial<WSListenerOptions>
    ): this
    on<T extends WSMessageType>(
        type: "message",
        messageType: T,
        listener: WSListener<T>["message"],
        options?: Partial<WSListenerOptions>
    ): this
    on<T extends keyof WebSocketEventListenerMap, K extends WSMessageType>(
        type: T,
        messageTypeOrListener: T extends "message" ? K : WSListener[T],
        listenerOrOptions?: T extends "message"
            ? WSListener<K>["message"]
            : Partial<WSListenerOptions>,
        options?: T extends "message" ? Partial<WSListenerOptions> : never
    ) {
        const defaultOptions: WSListenerOptions = {
            once: false
        }

        switch (type) {
            case "open": {
                const justOptions = listenerOrOptions as WSListenerOptions
                const opts = justOptions
                    ? { ...defaultOptions, ...justOptions }
                    : defaultOptions

                const justListener = messageTypeOrListener as WSListener["open"]
                this._listeners.open.set(justListener, opts)

                if (!this._nativeListeners.open) {
                    this._nativeListeners.open = () => {
                        const listeners = this._listeners.open

                        for (const [l, o] of listeners.entries()) {
                            l()
                            if (o.once) this.off("open", l)
                        }
                    }
                    this._on("open", this._nativeListeners.open)
                }

                break
            }

            case "close": {
                const justOptions = listenerOrOptions as WSListenerOptions
                const opts = justOptions
                    ? { ...defaultOptions, ...justOptions }
                    : defaultOptions

                const justListener = messageTypeOrListener as WSListener["close"]
                this._listeners.close.set(justListener, opts)

                if (!this._nativeListeners.close) {
                    this._nativeListeners.close = () => {
                        const listeners = this._listeners.close

                        for (const [l, o] of listeners.entries()) {
                            l()
                            if (o.once) this.off("close", l)
                        }
                    }
                    this._on("close", this._nativeListeners.close)
                }

                break
            }

            case "error": {
                const justOptions = listenerOrOptions as WSListenerOptions
                const opts = justOptions
                    ? { ...defaultOptions, ...justOptions }
                    : defaultOptions

                const justListener = messageTypeOrListener as WSListener["error"]
                this._listeners.error.set(justListener, opts)

                if (!this._nativeListeners.error) {
                    this._nativeListeners.error = e => {
                        const listeners = this._listeners.error

                        for (const [l, o] of listeners.entries()) {
                            l(e.error)
                            if (o.once) this.off("error", l)
                        }
                    }
                    this._on("error", this._nativeListeners.error)
                }

                break
            }

            case "message": {
                const justOptions = options as WSListenerOptions
                const opts = justOptions
                    ? { ...defaultOptions, ...justOptions }
                    : defaultOptions

                const messageType = messageTypeOrListener as WSMessageType
                const messageListener = listenerOrOptions as WSListener<K>["message"]

                if (this._listeners.message[messageType]) {
                    this._listeners.message[messageType].set(
                        messageListener,
                        opts
                    )
                } else {
                    this._listeners.message[messageType] = new Map([
                        [messageListener, opts]
                    ])
                }

                if (!this._nativeListeners.message) {
                    this._nativeListeners.message = e => {
                        const message: WSMessage[keyof WSMessage] = JSON.parse(
                            e.data
                        )
                        const listeners = this._listeners.message[message.type]

                        if (listeners) {
                            for (const [l, o] of listeners.entries()) {
                                l(message.data)
                                if (o.once) this.off("message", message.type, l)
                            }
                        }
                    }
                    this._on("message", this._nativeListeners.message)
                }

                break
            }
        }

        return this
    }

    off(): this
    off(type: "open", listener?: WSListener["open"]): this
    off(type: "close", listener?: WSListener["close"]): this
    off(type: "error", listener?: WSListener["error"]): this
    off<T extends WSMessageType>(
        type: "message",
        messageType?: T,
        listener?: WSListener<T>["message"]
    ): this
    off<T extends keyof WebSocketEventListenerMap, K extends WSMessageType>(
        type?: T,
        messageTypeOrListener?: T extends "message" ? K : WSListener[T],
        listener?: T extends "message" ? WSListener<K>["message"] : never
    ) {
        switch (type) {
            case "open": {
                const justListener = messageTypeOrListener as WSListener["open"]

                if (justListener) {
                    const listeners = this._listeners.open

                    if (listeners) {
                        listeners.delete(justListener)

                        if (listeners.size === 0) {
                            this._off("open", this._nativeListeners.open!)
                            delete this._nativeListeners.open
                        }
                    }
                } else {
                    const listeners = this._listeners.open

                    for (const l of listeners.keys()) {
                        this.off("open", l)
                    }
                }

                break
            }

            case "close": {
                const justListener = messageTypeOrListener as WSListener["close"]

                if (justListener) {
                    const listeners = this._listeners.close

                    if (listeners) {
                        listeners.delete(justListener)

                        if (listeners.size === 0) {
                            this._off("close", this._nativeListeners.close!)
                            delete this._nativeListeners.close
                        }
                    }
                } else {
                    const listeners = this._listeners.close

                    for (const l of listeners.keys()) {
                        this.off("close", l)
                    }
                }

                break
            }

            case "error": {
                const justListener = messageTypeOrListener as WSListener["error"]

                if (justListener) {
                    const listeners = this._listeners.error

                    if (listeners) {
                        listeners.delete(justListener)

                        if (listeners.size === 0) {
                            this._off("error", this._nativeListeners.error!)
                            delete this._nativeListeners.error
                        }
                    }
                } else {
                    const listeners = this._listeners.error

                    for (const l of listeners.keys()) {
                        this.off("error", l)
                    }
                }

                break
            }

            case "message": {
                const messageType = messageTypeOrListener as WSMessageType

                if (messageType && listener) {
                    const listeners = this._listeners.message[messageType]

                    if (listeners) {
                        listeners.delete(listener)

                        if (listeners.size === 0) {
                            delete this._listeners.message[messageType]

                            const types = Object.keys(this._listeners.message)

                            if (types.length === 0) {
                                this._off(
                                    "message",
                                    this._nativeListeners.message!
                                )
                                delete this._nativeListeners.message
                            }
                        }
                    }
                } else {
                    const messageTypes = Object.keys(
                        this._listeners.message
                    ) as Array<WSMessageType>

                    for (const t of messageTypes) {
                        const listeners = this._listeners.message[t]

                        for (const l of listeners.keys()) {
                            this.off("message", t, l)
                        }
                    }
                }

                break
            }

            default: {
                this.off("open").off("close").off("error").off("message")
            }
        }

        return this
    }
}
