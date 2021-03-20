<script lang="ts">
    import { TheMessages } from "./_components"

    import { onMount } from "svelte"
    import { darkTheme, auth } from "@/stores"

    darkTheme.sync()

    onMount(async () => {
        await auth.sync()
    })
</script>

<slot />
<TheMessages />
