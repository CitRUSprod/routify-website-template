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

<div class="h-full flex justify-center items-center">
    <div class="p-8 text-center border-2 border-blue-500 rounded-lg">
        <h1 class="text-4xl">Login</h1>
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
                placeholder="Password"
                type="password"
                bind:value="{password}"
            />
        </div>
        <div class="mt-4 flex justify-between">
            <a href="{$url('./register')}">
                <button
                    class="p-2 outline-none focus:outline-none text-white text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-400 dark:hover:text-white rounded duration-200"
                >
                    Register
                </button>
            </a>
            <button
                class="p-2 outline-none focus:outline-none text-white bg-blue-500 hover:bg-blue-600 rounded duration-200"
                on:click="{login}"
            >
                Login
            </button>
        </div>
    </div>
</div>
