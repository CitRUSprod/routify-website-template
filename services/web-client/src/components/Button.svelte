<script lang="ts">
    import Icon from "./Icon.svelte"

    import { createEventDispatcher } from "svelte"
    import { mdiLoading } from "@mdi/js"

    type Color =
        | "default"
        | "primary"
        | "success"
        | "error"
        | "warning"
        | "info"

    export let color: Color = "default"
    export let href: string | undefined = undefined
    export let disabled = false
    export let loading = false
    export let text = false
    export let icon = false

    let klass = ""
    export { klass as class }

    $: blocked = disabled || loading

    const dispatch = createEventDispatcher()

    function click() {
        if (!blocked) {
            dispatch("click")
        }
    }
</script>

<button
    class="font-medium rounded outline-none text-white py-2 px-4 transform duration-200 select-none focus:outline-none active:scale-95 disabled:cursor-not-allowed {klass}"
    class:text
    class:loading
    class:icon
    class:primary="{color === 'primary'}"
    class:success="{color === 'success'}"
    class:error="{color === 'error'}"
    class:warning="{color === 'warning'}"
    class:info="{color === 'info'}"
    disabled="{disabled}"
    on:click="{click}"
>
    <div>
        <slot />
    </div>
    {#if href !== undefined && !blocked}
        <a class="h-full w-full top-0 left-0 block absolute" href="{href}"> </a>
    {:else if loading}
        <div
            class="flex h-full w-full top-0 left-0 absolute justify-center items-center"
        >
            <Icon path="{mdiLoading}" spin="{0.5}" />
        </div>
    {/if}
</button>

<style lang="postcss">
    button {
        &.icon {
            @apply rounded-full p-0 w-10 h-10;

            > * {
                @apply rounded-full text-center;
            }
        }

        &.loading {
            @apply cursor-wait;

            > div:first-child {
                @apply opacity-0;
            }
        }

        &.text {
            @apply text-default;
            @apply hover:(text-white bg-alpha-default-500)
            @apply active:bg-alpha-default-700;
            @apply disabled:(text-alpha-default-700 bg-transparent hover:bg-transparent);
        }

        &:not(.text) {
            @apply bg-default;
            @apply hover:bg-default-500;
            @apply active:bg-default-700;
            @apply disabled:(text-alpha-default-700 bg-alpha-default-700-30 hover:bg-alpha-default-700-30);
        }
    }

    .primary {
        &.text {
            @apply text-primary;
            @apply hover:bg-alpha-primary-500;
            @apply active:bg-alpha-primary-700;
        }

        &:not(.text) {
            @apply bg-primary;
            @apply hover:bg-primary-500;
            @apply active:bg-primary-700;
        }
    }

    .success {
        &.text {
            @apply text-success;
            @apply hover:bg-alpha-success-500;
            @apply active:bg-alpha-success-700;
        }

        &:not(.text) {
            @apply bg-success;
            @apply hover:bg-success-500;
            @apply active:bg-success-700;
        }
    }

    .error {
        &.text {
            @apply text-error;
            @apply hover:bg-alpha-error-500;
            @apply active:bg-alpha-error-700;
        }

        &:not(.text) {
            @apply bg-error;
            @apply hover:bg-error-500;
            @apply active:bg-error-700;
        }
    }

    .warning {
        &.text {
            @apply text-warning;
            @apply hover:bg-alpha-warning-500;
            @apply active:bg-alpha-warning-700;
        }

        &:not(.text) {
            @apply bg-warning;
            @apply hover:bg-warning-500;
            @apply active:bg-warning-700;
        }
    }

    .info {
        &.text {
            @apply text-info;
            @apply hover:bg-alpha-info-500;
            @apply active:bg-alpha-info-700;
        }

        &:not(.text) {
            @apply bg-info;
            @apply hover:bg-info-500;
            @apply active:bg-info-700;
        }
    }
</style>
