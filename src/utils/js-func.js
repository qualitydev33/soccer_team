export function checkNull(val) {
    return val === null || val === undefined || String(val).toLowerCase() === "n/a"
}

export function arrToObj(arr, key) {
    return arr.reduce((a, b) => ({...a, [b[key]]: b }), {})
}

export function setWStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
}
export function getWStorage(key) {
    let result = window.localStorage.getItem(key)
    if (!checkNull(result)) return JSON.parse(result)
    else return null
}