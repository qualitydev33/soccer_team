/*
 * @Description:JS Tricks
 */
export function utilIsNull(val) {
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
    if (!utilIsNull(result)) return JSON.parse(result)
    else return null
}

export function utilJsonClone(val) {
    return JSON.parse(JSON.stringify(val))
}

export function utilCompareObject(obj1, obj2) {
    if (JSON.stringify(obj1) === JSON.stringify(obj2)) return true
    else return false
}

export function utilIsNullInArrayOfObj(arr, keyArr) {
    let nullIdx = -1
    const hasNull = (ele) => {
        let result = false
        keyArr.map((item, idx) => {
            if (ele[item] === null) { result = true; }
        })
        return result
    }
    return arr.some(hasNull)
}