<script lang="ts">
    import { TheMessages } from "./_components"

    import { onMount } from "svelte"
    import { darkTheme, auth } from "@/stores"

    onMount(() => {
        darkTheme.sync()
        auth.sync()
    })
</script>

<slot />
<TheMessages />
