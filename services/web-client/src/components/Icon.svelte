<script lang="ts">
    export let path: string
    export let size = 1
    export let rotate = 0
    export let spin = 0

    $: inverse = spin < 0 ? true : false
    $: spinTime = Math.abs(spin)

    function getStyles(localSize: number, localRotate: number) {
        const styles: { [key: string]: string } = {}

        if (localSize > 0) {
            const width = `${localSize * 1.5}rem`
            styles.width = width
            styles.height = width
        }

        if (localRotate !== 0) {
            styles.transform = `rotate(${localRotate}deg)`
            styles["transform-origin"] = "center"
        }

        const result = Object.entries(styles).reduce((acc, [key, value]) => {
            return `${acc}${key}: ${value};`
        }, "")

        return result
    }

    $: style = getStyles(size, rotate)
</script>

<svg class="fill-current inline" viewBox="0 0 24 24" style="{style}">
    {#if spin !== 0}
        <g
            class="animation"
            class:spin="{!inverse}"
            class:spin-inverse="{inverse}"
            style="{`animation-duration: ${spinTime}s`}"
        >
            <path d="{path}"></path>
        </g>
    {:else}
        <path d="{path}"></path>
    {/if}
</svg>

<style lang="postcss">
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes spin-inverse {
        to {
            transform: rotate(-360deg);
        }
    }

    g {
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        transform-origin: center;
    }

    .spin {
        animation-name: spin;
    }

    .spin-inverse {
        animation-name: spin-inverse;
    }
</style>
