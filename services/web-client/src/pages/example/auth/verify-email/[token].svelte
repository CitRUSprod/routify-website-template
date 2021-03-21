<script lang="ts">
    import { onMount } from "svelte"
    import { params, redirect } from "@roxi/routify"
    import { axios } from "@/assets/utils"
    import { messages } from "@/stores"

    onMount(async () => {
        try {
            await axios.post("/api/auth/verify-email", { token: $params.token })
            messages.add("success", "Email verified successfully")
        } catch (err) {
            messages.add("error", err.data?.message ?? err.message)
        }

        $redirect("/")
    })
</script>
