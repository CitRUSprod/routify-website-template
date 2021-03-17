<script lang="ts">
    import { url } from "@roxi/routify"
    import Icon from "mdi-svelte"
    import { mdiThemeLightDark } from "@mdi/js"
    import { darkTheme, auth } from "@/stores"

    interface Link {
        text: string
        url: string
    }

    const { user } = auth

    const links: Array<Link> = [
        {
            text: "Home",
            url: "./"
        },
        {
            text: "Profile",
            url: "./profile"
        }
    ]

    function toggleDarkTheme() {
        $darkTheme = !$darkTheme
    }
</script>

<header class="bg-primary flex text-lg text-white p-4 items-center">
    <h1 class="mr-8 text-2xl">
        <a href="/">Routify App</a>
    </h1>
    <nav class="flex flex-grow space-x-2">
        {#each links as link}
            <a
                class="rounded p-2 duration-200 block hover:bg-secondary"
                href="{$url(link.url)}"
            >
                <span>{link.text}</span>
            </a>
        {/each}
    </nav>
    <button
        class="rounded-full outline-none mx-2 p-2 duration-200 hover:bg-secondary focus:outline-none"
        on:click="{toggleDarkTheme}"
    >
        <Icon path="{mdiThemeLightDark}" />
    </button>
    <nav class="flex space-x-2">
        {#if $user}
            <a
                class="rounded p-2 duration-200 block hover:bg-secondary"
                href="{$url('./auth/logout')}"
            >
                <span>Logout</span>
            </a>
        {:else}
            <a
                class="rounded p-2 duration-200 block hover:bg-secondary"
                href="{$url('./auth/login')}"
            >
                <span>Login</span>
            </a>
        {/if}
    </nav>
</header>
