<script lang="ts">
    import { url } from "@roxi/routify"
    import { auth, messages } from "@/stores"

    let email = ""
    let username = ""
    let password = ""

    async function register() {
        try {
            await auth.register(email, username, password)
            messages.add("success", "You have successfully registered")
        } catch (err) {
            messages.add("error", err.data.message)
        }
    }
</script>

<div class="flex h-full justify-center items-center">
    <div class="border-primary rounded-lg border-2 text-center p-8">
        <h1 class="text-4xl">Register</h1>
        <div class="mt-4">
            <input
                class="rounded outline-none bg-gray-200 p-2 dark:bg-gray-800 focus:outline-none"
                placeholder="Email"
                bind:value="{email}"
            />
        </div>
        <div class="mt-2">
            <input
                class="rounded outline-none bg-gray-200 p-2 dark:bg-gray-800 focus:outline-none"
                placeholder="Username"
                bind:value="{username}"
            />
        </div>
        <div class="mt-2">
            <input
                class="rounded outline-none bg-gray-200 p-2 dark:bg-gray-800 focus:outline-none"
                placeholder="Password"
                type="password"
                bind:value="{password}"
            />
        </div>
        <div class="flex mt-4 justify-between">
            <a href="{$url('./login')}">
                <button
                    class="rounded outline-none text-primary p-2 duration-200 hover:bg-primary hover:text-white focus:outline-none"
                >
                    Login
                </button>
            </a>
            <button
                class="bg-primary rounded outline-none text-white p-2 duration-200 hover:bg-secondary focus:outline-none"
                on:click="{register}"
            >
                Register
            </button>
        </div>
    </div>
</div>
