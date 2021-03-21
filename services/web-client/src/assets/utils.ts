import axios from "redaxios"
import cookies from "js-cookie"

function syncToken() {
    const token = cookies.get("token")

    if (token) {
        axios.defaults.headers ??= {}
        axios.defaults.headers.authorization = `Bearer ${token}`
    } else {
        delete axios.defaults.headers?.authorization
    }

    return token
}

syncToken()

export { axios, cookies, syncToken }
