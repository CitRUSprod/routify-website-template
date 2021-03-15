<script lang="ts">
    import { onMount } from "svelte"
    import { redirect } from "@roxi/routify"
    import { auth, messages } from "@/stores"

    onMount(async () => {
        await auth.logout()
        messages.add("success", "You have successfully logged out")
        $redirect("/")
    })
</script>
