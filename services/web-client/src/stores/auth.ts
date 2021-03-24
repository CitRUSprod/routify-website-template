import { axios, cookies } from "@/assets/utils"
import { writable, derived } from "svelte/store"

interface User {
    email: string
    username: string
    verified: boolean
}

function createAuthStore() {
    const writableUser = writable<Readonly<User> | undefined>(undefined)
    const writableSyncing = writable(true)
    const user = derived(writableUser, u => u)
    const syncing = derived(writableSyncing, s => s)

    async function sync() {
        const token = cookies.get("token")

        if (token) {
            writableSyncing.set(true)

            try {
                const { data } = await axios.get("/api/auth/user")
                writableUser.set(data)
            } catch (err) {
                writableUser.set(undefined)
            }
        } else {
            writableUser.set(undefined)
        }

        writableSyncing.set(false)
    }

    async function register(email: string, username: string, password: string) {
        await axios.post("/api/auth/register", {
            email,
            username,
            password
        })
    }

    async function login(email: string, password: string) {
        await axios.post("/api/auth/login", {
            email,
            password
        })
        await sync()
    }

    async function logout() {
        cookies.remove("token")
        await sync()
    }

    return { user, syncing, sync, register, login, logout }
}

export const auth = createAuthStore()
