import { get } from "svelte/store"
import { writable } from "@/assets/local-storage"

function setDarkClass(value: boolean) {
    if (value) {
        document.documentElement.classList.add("dark")
    } else {
        document.documentElement.classList.remove("dark")
    }
}

function createThemeStore() {
    const { subscribe, update } = writable("theme-dark", false)
    const dark = { subscribe }

    setDarkClass(get(dark))

    function toggle() {
        update(d => {
            const newDark = !d
            setDarkClass(newDark)
            return newDark
        })
    }

    return { dark, toggle }
}

export const theme = createThemeStore()
