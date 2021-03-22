<script lang="ts">
    import { ThePageProgressBar, TheMessages } from "./_components"

    import { onMount } from "svelte"
    import { auth } from "@/stores"

    onMount(() => {
        auth.sync()
    })
</script>

<ThePageProgressBar />
<slot />
<TheMessages />
