<script lang="ts">
    import { Button, TextField } from "@/components"

    import { url } from "@roxi/routify"
    import { auth, messages } from "@/stores"

    let email = ""
    let username = ""
    let password = ""

    let loading = false

    $: disabled = !email || !username || !password

    async function register() {
        loading = true

        try {
            await auth.register(email, username, password)
            messages.add("success", "You have successfully registered")
        } catch (err) {
            messages.add("error", err.data.message)
        }

        loading = false
    }
</script>

<div class="flex h-full justify-center items-center">
    <div class="border-primary rounded-lg border-2 text-center p-8 w-80">
        <h1 class="text-4xl">Register</h1>
        <div class="mt-4">
            <TextField
                class="w-full"
                placeholder="Email"
                disabled="{loading}"
                bind:value="{email}"
            />
        </div>
        <div class="mt-2">
            <TextField
                class="w-full"
                placeholder="Username"
                disabled="{loading}"
                bind:value="{username}"
            />
        </div>
        <div class="mt-2">
            <TextField
                class="w-full"
                placeholder="Password"
                type="password"
                disabled="{loading}"
                bind:value="{password}"
            />
        </div>
        <div class="flex mt-4 justify-between">
            <Button color="primary" href="{$url('./login')}" text>
                Login
            </Button>
            <Button
                color="primary"
                loading="{loading}"
                disabled="{disabled}"
                on:click="{register}"
            >
                Register
            </Button>
        </div>
    </div>
</div>
