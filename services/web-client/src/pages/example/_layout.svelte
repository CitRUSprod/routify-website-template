<script lang="ts">
    import { TheHeader } from "./_components"

    import { auth } from "@/stores"

    if (window.routify.inBrowser) {
        auth.sync()
    }
</script>

<TheHeader />
<main class="flex-grow p-4">
    <slot />
</main>
