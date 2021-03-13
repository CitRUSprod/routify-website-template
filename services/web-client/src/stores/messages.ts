import { writable } from "svelte/store"

type MessageType = "success" | "error" | "warning" | "info"

interface Message {
    id: number
    type: MessageType
    text: string
}

function createMessages() {
    const { subscribe, update } = writable<Array<Message>>([])

    return {
        subscribe,
        add(type: MessageType, text: string, timeout = 5000) {
            update(messages => {
                const id = Date.now()
                const message: Message = {
                    id,
                    type,
                    text: text.trim()
                }
                messages = [message, ...messages]

                setTimeout(() => {
                    this.remove(id)
                }, timeout)

                return messages
            })
        },
        remove(id: number) {
            update(messages => {
                messages = messages.filter(msg => msg.id !== id)
                return messages
            })
        }
    }
}

export const messages = createMessages()
