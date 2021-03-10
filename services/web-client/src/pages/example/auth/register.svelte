<script lang="ts">
    import { url } from "@roxi/routify"
    import { auth } from "@/stores"

    let email = ""
    let username = ""
    let password = ""

    async function register() {
        await auth.register(email, username, password)
    }
</script>

<div class="h-full flex justify-center items-center">
    <div class="p-8 text-center border-2 border-blue-500 rounded-lg">
        <h1 class="text-4xl">Register</h1>
        <div class="mt-4">
            <input
                class="p-2 rounded outline-none focus:outline-none bg-gray-200 dark:bg-gray-800"
                placeholder="Email"
                bind:value="{email}"
            />
        </div>
        <div class="mt-2">
            <input
                class="p-2 rounded outline-none focus:outline-none bg-gray-200 dark:bg-gray-800"
                placeholder="Username"
                bind:value="{username}"
            />
        </div>
        <div class="mt-2">
            <input
                class="p-2 rounded outline-none focus:outline-none bg-gray-200 dark:bg-gray-800"
                placeholder="Password"
                type="password"
                bind:value="{password}"
            />
        </div>
        <div class="mt-4 flex justify-between">
            <a href="{$url('./login')}">
                <button
                    class="p-2 outline-none focus:outline-none text-white text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-400 dark:hover:text-white rounded duration-200"
                >
                    Login
                </button>
            </a>
            <button
                class="p-2 outline-none focus:outline-none text-white bg-blue-500 hover:bg-blue-600 rounded duration-200"
                on:click="{register}"
            >
                Register
            </button>
        </div>
    </div>
</div>
