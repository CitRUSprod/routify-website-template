import { axios, cookies, syncToken } from "@/assets/utils"
import { writable, derived } from "svelte/store"

interface User {
    email: string
    username: string
    verified: boolean
}

function createAuthStore() {
    const writableUser = writable<User | undefined>(undefined)
    const user = derived(writableUser, u => u)

    async function sync() {
        const token = syncToken()

        if (token) {
            try {
                const { data } = await axios.get("/api/auth/user")
                writableUser.set(data)
            } catch (err) {
                writableUser.set(undefined)
            }
        } else {
            writableUser.set(undefined)
        }
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

    return { user, sync, register, login, logout }
}

export const auth = createAuthStore()
