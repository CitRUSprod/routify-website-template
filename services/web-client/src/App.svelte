<script lang="ts">
    import { Router } from "@roxi/routify"

    import { routes } from "@routify/routes"
</script>

<Router routes="{routes}" />

<style lang="postcss" global>
    :root,
    body,
    #routify-app {
        @apply h-full;
    }

    body {
        @apply bg-white;
        @apply dark:(text-white bg-gray-900);
    }

    #routify-app {
        @apply relative flex flex-col;
    }

    .break-text {
        word-break: break-word;
    }
</style>
