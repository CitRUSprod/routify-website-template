<script lang="ts">
    import { redirect } from "@roxi/routify"
    import { auth, messages } from "@/stores"

    async function logout() {
        await auth.logout()
        messages.add("success", "You have successfully logged out")
        $redirect("/")
    }

    if (window.routify.inBrowser) {
        logout()
    }
</script>
