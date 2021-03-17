<script lang="ts">
    import { fly, fade } from "svelte/transition"
    import Icon from "mdi-svelte"
    import { mdiClose } from "@mdi/js"
    import { messages } from "@/stores"
</script>

<div class="space-y-2 right-4 bottom-4 w-60 absolute">
    {#each $messages as message (message.id)}
        <div
            class="rounded-lg flex shadow p-3 items-center select-none"
            class:success="{message.type === 'success'}"
            class:error="{message.type === 'error'}"
            class:warning="{message.type === 'warning'}"
            class:info="{message.type === 'info'}"
            in:fly="{{ y: -200, duration: 500 }}"
            out:fade
        >
            <div class="flex-grow pr-3 break-words">{message.text}</div>
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
    .success {
        @apply bg-success;
    }

    .error {
        @apply bg-error;
    }

    .warning {
        @apply bg-warning;
    }

    .info {
        @apply bg-info;
    }
</style>
