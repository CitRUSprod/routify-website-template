import axios from "redaxios"
import cookies from "js-cookie"
import { writable, derived } from "svelte/store"

interface User {
    email: string
    username: string
    verified: boolean
}

function setToken() {
    const token = cookies.get("token")

    if (token) {
        if (!axios.defaults.headers) {
            axios.defaults.headers = {}
        }

        axios.defaults.headers.authorization = `Bearer ${token}`
    } else {
        delete axios.defaults.headers?.authorization
    }
}

function createAuthStore() {
    const user = writable<User | undefined>(undefined)
    const loggedIn = derived(user, u => !!u)

    async function updateUser() {
        setToken()

        try {
            const { data } = await axios.get("/api/auth/user")
            user.set(data)
        } catch (err) {
            user.set(undefined)
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
        await updateUser()
    }

    async function logout() {
        cookies.remove("token")
        user.set(undefined)
    }

    return { loggedIn, user, updateUser, register, login, logout }
}

export const auth = createAuthStore()
