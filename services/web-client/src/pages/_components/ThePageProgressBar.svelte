<script lang="ts">
    import { isChangingPage } from "@roxi/routify"
    import NProgress from "nprogress"

    NProgress.configure({
        showSpinner: false
    })

    let firstLoading = true

    function watchForChanging(changing: boolean) {
        if (firstLoading) {
            if (!changing) {
                firstLoading = false
            }
        } else {
            if (changing) {
                NProgress.start()
            } else {
                NProgress.done()
            }
        }
    }

    $: watchForChanging($isChangingPage)
</script>

<style lang="postcss" global>
    #nprogress {
        @apply pointer-events-none;

        .bar {
            @apply fixed top-0 left-0 w-full h-2px bg-green-500 z-1000;
        }
    }
</style>
