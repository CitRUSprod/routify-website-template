<script lang="ts">
    import { redirect, ready } from "@roxi/routify"
    import { auth, messages } from "@/stores"

    auth.logout()

    auth.updateUser().then(() => {
        messages.add("success", "You have successfully logged out")
        $redirect("/")
        $ready()
    })
</script>
