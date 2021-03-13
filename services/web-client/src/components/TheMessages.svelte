<script lang="ts">
    import { fly, fade } from "svelte/transition"
    import Icon from "mdi-svelte"
    import { mdiClose } from "@mdi/js"
    import { messages } from "@/stores"
</script>

<div class="absolute bottom-4 right-4 w-60 space-y-2">
    {#each $messages as message (message.id)}
        <div
            class="p-3 flex flex-grow items-center rounded-lg shadow"
            class:success="{message.type === 'success'}"
            class:error="{message.type === 'error'}"
            class:warning="{message.type === 'warning'}"
            class:info="{message.type === 'info'}"
            in:fly="{{ y: -200, duration: 500 }}"
            out:fade
        >
            <div class="message-text">{message.text}</div>
            <div
                class="cursor-pointer"
                on:click="{() => messages.remove(message.id)}"
            >
                <Icon path="{mdiClose}" />
            </div>
        </div>
    {/each}
</div>

<style lang="postcss">
    .message-text {
        @apply pr-3;

        word-break: break-word;
    }

    .success {
        @apply bg-green-500;
    }

    .error {
        @apply bg-red-500;
    }

    .warning {
        @apply bg-yellow-500;
    }

    .info {
        @apply bg-blue-500;
    }
</style>
