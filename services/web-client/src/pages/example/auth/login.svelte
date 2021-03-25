<script lang="ts">
    import { Button, TextField } from "@/components"

    import { url, redirect, goto } from "@roxi/routify"
    import { auth, messages } from "@/stores"

    const { user, syncing } = auth

    $: if ($user && !$syncing) {
        $redirect("/")
    }

    let email = ""
    let password = ""

    let loading = false

    $: trimmedEmail = email.trim()
    $: trimmedPassword = password.trim()

    $: disabled = !trimmedEmail || !trimmedPassword

    async function login() {
        loading = true

        try {
            await auth.login(trimmedEmail, trimmedPassword)
            messages.add("success", "You have successfully logged in")
            $goto("/")
        } catch (err) {
            messages.add("error", err.data?.message ?? err.message)
        }

        loading = false
    }

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && !disabled) {
            await login()
            const input = e.target as HTMLInputElement
            input.focus()
        }
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
                autofocus
                bind:value="{email}"
                on:keypress="{onEnter}"
            />
        </div>
        <div class="mt-2">
            <TextField
                class="w-full"
                placeholder="Password"
                type="password"
                disabled="{loading}"
                bind:value="{password}"
                on:keypress="{onEnter}"
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
