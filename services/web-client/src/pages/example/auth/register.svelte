<script lang="ts">
    import { Button, TextField } from "@/components"

    import { url, redirect, goto } from "@roxi/routify"
    import { auth, messages } from "@/stores"

    const { user, syncing } = auth

    $: if ($user && !$syncing) {
        $redirect("/")
    }

    let email = ""
    let username = ""
    let password = ""
    let passwordConfirmation = ""

    $: trimmedEmail = email.trim()
    $: trimmedUsername = username.trim()
    $: trimmedPassword = password.trim()
    $: trimmedPasswordConfirmation = passwordConfirmation.trim()

    let loading = false

    $: disabled =
        !trimmedEmail ||
        !trimmedUsername ||
        !trimmedPassword ||
        !trimmedPasswordConfirmation ||
        trimmedPassword !== trimmedPasswordConfirmation

    async function register() {
        loading = true

        try {
            await auth.register(trimmedEmail, trimmedUsername, trimmedPassword)
            messages.add("success", "You have successfully registered")
            $goto($url("./login"))
        } catch (err) {
            messages.add("error", err.data?.message ?? err.message)
        }

        loading = false
    }

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && !disabled) {
            await register()
            const input = e.target as HTMLInputElement
            input.focus()
        }
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
                autofocus
                bind:value="{email}"
                on:keypress="{onEnter}"
            />
        </div>
        <div class="mt-2">
            <TextField
                class="w-full"
                placeholder="Username"
                disabled="{loading}"
                bind:value="{username}"
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
        <div class="mt-2">
            <TextField
                class="w-full"
                placeholder="Password Confirmation"
                type="password"
                disabled="{loading}"
                bind:value="{passwordConfirmation}"
                on:keypress="{onEnter}"
            />
        </div>
        <div class="flex mt-4 justify-between">
            <Button color="primary" href="{$url('./login')}" text>Login</Button>
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
