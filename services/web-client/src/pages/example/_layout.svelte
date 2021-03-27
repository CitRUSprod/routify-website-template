<script lang="ts">
    import { TheHeader } from "./_components"

    import { onDestroy } from "svelte"
    import { auth, messages } from "@/stores"
    import { WSClient } from "@/assets/ws"

    let ws: WSClient

    if (window.routify.inBrowser) {
        auth.sync()

        ws = new WSClient()
        ws.on("error", err => {
            messages.add(
                "error",
                err?.message ?? "An unexpected error occurred"
            )
        })
    }

    onDestroy(() => {
        ws.off().close()
    })
</script>

<TheHeader />
<main class="flex-grow p-4">
    <slot scoped="{{ ws }}" />
</main>
