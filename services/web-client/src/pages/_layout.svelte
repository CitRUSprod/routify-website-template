<script lang="ts">
    import { ready } from "@roxi/routify"
    import { darkTheme, auth } from "@/stores"

    darkTheme.sync()

    auth.updateUser().then(() => {
        $ready()
    })
</script>

<slot />
