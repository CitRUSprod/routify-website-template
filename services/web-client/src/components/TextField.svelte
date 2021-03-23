<script lang="ts">
    import { onMount } from "svelte"

    type Type = "text" | "password" | "number"

    export let value: string | number | null | undefined = undefined
    export let placeholder: string | undefined = undefined
    export let type: Type = "text"
    export let disabled = false
    export let readonly = false
    export let autofocus = false

    let klass = ""
    export { klass as class }

    let input: HTMLInputElement

    onMount(() => {
        if (autofocus) {
            input.focus()
        }
    })

    function setTextType(node: HTMLInputElement) {
        node.type = type
    }
</script>

{#if type === "number"}
    <input
        class="{klass}"
        type="number"
        placeholder="{placeholder}"
        disabled="{disabled}"
        readonly="{readonly}"
        bind:value
        bind:this="{input}"
        on:keypress
    />
{:else}
    <input
        class="{klass}"
        placeholder="{placeholder}"
        disabled="{disabled}"
        readonly="{readonly}"
        bind:value
        bind:this="{input}"
        use:setTextType
        on:keypress
    />
{/if}

<style lang="postcss">
    input {
        @apply rounded outline-none bg-alpha-default-500-20 p-2 duration-200;
        @apply focus:outline-none;
        @apply disabled:(cursor-not-allowed text-alpha-default-700 bg-alpha-default-700-30 placeholder-alpha-default-600-20);

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            @apply m-0;
            -webkit-appearance: none;
        }

        &[type="number"] {
            -moz-appearance: textfield;
        }
    }
</style>
