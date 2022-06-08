export function utilCheckNull(val) {
    return val === null || val === undefined || String(val).toLowerCase() === "n/a"
}

export function utilArrToObj(arr, key) {
    return arr.reduce((a, b) => ({...a, [b[key]]: b }), {})
}

export function utilSetWStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
}
export function utilGetWStorage(key) {
    let result = window.localStorage.getItem(key)
    if (!utilCheckNull(result)) return JSON.parse(result)
    else return null
}

export function utilJsonClone(val) {
    return JSON.parse(JSON.stringify(val))
}