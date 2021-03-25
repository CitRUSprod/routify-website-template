<script lang="ts">
    import { params, redirect } from "@roxi/routify"
    import { axios } from "@/assets/utils"
    import { messages } from "@/stores"

    async function verifyEmail() {
        try {
            await axios.post("/api/auth/verify-email", { token: $params.token })
            messages.add("success", "Email verified successfully")
        } catch (err) {
            messages.add("error", err.response.data.message ?? err.message)
        }

        $redirect("/")
    }

    if (window.routify.inBrowser) {
        verifyEmail()
    }
</script>
