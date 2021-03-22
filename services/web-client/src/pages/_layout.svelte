<script lang="ts">
    import { TheMessages } from "./_components"

    import { onMount } from "svelte"
    import { auth } from "@/stores"

    onMount(() => {
        auth.sync()
    })
</script>

<slot />
<TheMessages />
