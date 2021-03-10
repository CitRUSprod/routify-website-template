<script lang="ts">
    import { redirect, ready } from "@roxi/routify"
    import { auth } from "@/stores"

    auth.logout()

    auth.updateUser().then(() => {
        $redirect("/")
        $ready()
    })
</script>
