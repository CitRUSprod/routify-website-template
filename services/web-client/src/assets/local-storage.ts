import { writable as svelteWritable, get } from "svelte/store"

export function writable<T>(key: string, value: T) {
    const store = svelteWritable(value)
    const { subscribe, set, update } = store
    const json = localStorage !== undefined ? localStorage.getItem(key) : null

    if (json) {
        set(JSON.parse(json))
    }

    function updateStorage(k: string, v: T) {
        if (localStorage !== undefined) {
            localStorage.setItem(k, JSON.stringify(v))
        }
    }

    return {
        subscribe,
        set(...[v]: Parameters<typeof set>) {
            updateStorage(key, v)
            set(v)
        },
        update(...[u]: Parameters<typeof update>) {
            const v = u(get(store))
            updateStorage(key, v)
            set(v)
        }
    }
}
