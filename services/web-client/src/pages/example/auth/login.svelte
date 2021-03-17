<script lang="ts">
    import { url, redirect } from "@roxi/routify"
    import { auth, messages } from "@/stores"

    let email = ""
    let password = ""

    async function login() {
        try {
            await auth.login(email, password)
            messages.add("success", "You have successfully logged in")
            $redirect("/")
        } catch (err) {
            messages.add("error", err.data.message)
        }
    }
</script>

<div class="flex h-full justify-center items-center">
    <div class="border-primary rounded-lg border-2 text-center p-8">
        <h1 class="text-4xl">Login</h1>
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
                placeholder="Password"
                type="password"
                bind:value="{password}"
            />
        </div>
        <div class="flex mt-4 justify-between">
            <a href="{$url('./register')}">
                <button
                    class="rounded outline-none text-primary p-2 duration-200 hover:bg-primary hover:text-white focus:outline-none"
                >
                    Register
                </button>
            </a>
            <button
                class="bg-primary rounded outline-none text-white p-2 duration-200 hover:bg-secondary focus:outline-none"
                on:click="{login}"
            >
                Login
            </button>
        </div>
    </div>
</div>
