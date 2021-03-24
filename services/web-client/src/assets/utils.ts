import axios from "axios"
import cookies from "js-cookie"

axios.interceptors.request.use(config => {
    if (config.url) {
        const url = new URL(
            config.url[0] === "/"
                ? `${location.origin}${config.url}`
                : config.url
        )

        if (location.origin === url.origin && !config.headers.Authorization) {
            const token = cookies.get("token")

            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
    }

    return config
})

export { axios, cookies }
