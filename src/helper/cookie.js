import JsCookie from "js-cookie";

export const handleSetCookie = (payload) => {
    JsCookie.set(payload.name, payload.value)
}

export const handleRemoveCookie = (name) => {
    JsCookie.remove(name)
}

export const handleGetCookie = (name) => {
    return JsCookie.get(name)
}