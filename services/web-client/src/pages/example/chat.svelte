<script lang="ts">
    import { TextField } from "@/components"

    import OverlayScrollbars from "overlayscrollbars"
    import { onMount, onDestroy, tick } from "svelte"
    import { auth } from "@/stores"
    import { WSClient, WSMessageType } from "@/assets/ws"
    import type { WSMessage } from "@/assets/ws"

    export let scoped: { ws: WSClient }

    $: ({ ws } = scoped)

    const { user } = auth

    type ReceivedMessageData = WSMessage[WSMessageType.GChatReceivedMessage]["data"]

    let messages: Array<ReceivedMessageData> = []

    let messagesWrapper: HTMLElement
    let scrollbar: OverlayScrollbars

    const messageListener = (data: ReceivedMessageData) => {
        messages.push(data)
        messages = messages
    }

    onMount(() => {
        if (window.routify.inBrowser) {
            ws.on(
                "message",
                WSMessageType.GChatReceivedMessage,
                messageListener
            )

            scrollbar = OverlayScrollbars(messagesWrapper, {
                scrollbars: {
                    autoHide: "move"
                }
            })
        }
    })

    onDestroy(() => {
        ws.off("message", WSMessageType.GChatReceivedMessage, messageListener)
        scrollbar.destroy()
    })

    async function scrollDown() {
        const element = scrollbar.getElements().viewport
        const height = element.clientHeight + element.scrollTop

        if (height === element.scrollHeight) {
            await tick()
            scrollbar.scroll(element.scrollHeight, 200)
        }
    }

    $: if (messages.length > 0) {
        scrollDown()
    }

    let messageText = ""

    $: trimmedMessageText = messageText.trim()

    function sendMessage() {
        if (trimmedMessageText) {
            ws.send({
                type: WSMessageType.GChatSentMessage,
                data: {
                    text: trimmedMessageText
                }
            })
            messageText = ""
        }
    }

    function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter") {
            sendMessage()
        }
    }
</script>

<div class="flex h-full justify-center">
    <div class="border-primary rounded-lg flex flex-col border-2 p-8 w-100">
        <div class="pb-4">
            <h1 class="text-center text-4xl">Global chat</h1>
        </div>
        <div class="flex-grow relative">
            <div
                class="h-full w-full overflow-y-auto absolute"
                bind:this="{messagesWrapper}"
            >
                <div class="h-full w-full">
                    {#each messages as message}
                        <div class="py-1 break-text">
                            <b>{message.sender}:</b>
                            <span>{message.text}</span>
                        </div>
                    {:else}
                        <div class="flex flex-col h-full justify-center">
                            <h1 class="text-center text-default text-2xl">
                                No messages
                            </h1>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        {#if $user}
            <div class="pt-4">
                <TextField
                    class="w-full"
                    placeholder="Message"
                    bind:value="{messageText}"
                    on:keypress="{onEnter}"
                />
            </div>
        {/if}
    </div>
</div>
