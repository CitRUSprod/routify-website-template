<script lang="ts">
    import { Button, Icon } from "@/components"

    import { url } from "@roxi/routify"
    import { mdiThemeLightDark } from "@mdi/js"
    import { theme, auth } from "@/stores"

    interface Link {
        text: string
        url: string
    }

    const { user } = auth

    let links: Array<Link>
    $: links = [
        { text: "Home", url: "./" },
        ...($user ? [{ text: "Profile", url: "./profile" }] : [])
    ]
</script>

<header class="bg-primary flex p-4 items-center">
    <h1 class="mr-8 text-white text-2xl">
        <a href="/">Routify App</a>
    </h1>
    <nav class="flex flex-grow space-x-2">
        {#each links as link}
            <Button color="primary" href="{$url(link.url)}">
                {link.text}
            </Button>
        {/each}
    </nav>
    <nav class="flex space-x-2">
        <Button color="primary" icon on:click="{theme.toggle}">
            <Icon path="{mdiThemeLightDark}" />
        </Button>
        {#if $user}
            <Button color="primary" href="{$url('./auth/logout')}">
                Logout
            </Button>
        {:else}
            <Button color="primary" href="{$url('./auth/login')}">Login</Button>
        {/if}
    </nav>
</header>
