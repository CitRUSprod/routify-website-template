<script lang="ts">
    import { Button, TextField } from "@/components"

    import { url, redirect } from "@roxi/routify"
    import { auth, messages } from "@/stores"

    const { user, syncing } = auth

    $: if ($user && !$syncing) {
        $redirect("/")
    }

    let email = ""
    let password = ""

    let loading = false

    $: disabled = !email || !password

    async function login() {
        loading = true

        try {
            await auth.login(email, password)
            messages.add("success", "You have successfully logged in")
            $redirect("/")
        } catch (err) {
            messages.add("error", err.data?.message ?? err.message)
        }

        loading = false
    }
</script>

<div class="flex h-full justify-center items-center">
    <div class="border-primary rounded-lg border-2 text-center p-8 w-80">
        <h1 class="text-4xl">Login</h1>
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
                placeholder="Password"
                type="password"
                disabled="{loading}"
                bind:value="{password}"
            />
        </div>
        <div class="flex mt-4 justify-between">
            <Button color="primary" href="{$url('./register')}" text>
                Register
            </Button>
            <Button
                color="primary"
                loading="{loading}"
                disabled="{disabled}"
                on:click="{login}"
            >
                Login
            </Button>
        </div>
    </div>
</div>
