<script lang="ts">
    import { Button } from "@/components"

    import { redirect } from "@roxi/routify"
    import { auth, messages } from "@/stores"
    import { axios } from "@/assets/utils"

    const { user, syncing } = auth

    $: if (!$user && !$syncing) {
        $redirect("/")
    }

    async function sendVerificationEmail() {
        try {
            await axios.post("/api/auth/send-verification-email")
            messages.add("success", "Email was sent")
        } catch (err) {
            messages.add("error", err.data?.message ?? err.message)
        }
    }
</script>

{#if $user}
    <div><b>Email:</b> {$user.email}</div>
    <div><b>Username:</b> {$user.username}</div>
    <div><b>Verified:</b> {$user.verified ? "yes" : "no"}</div>
    {#if !$user.verified}
        <div class="mt-2">
            <Button color="success" on:click="{sendVerificationEmail}">
                Verify email
            </Button>
        </div>
    {/if}
{/if}
