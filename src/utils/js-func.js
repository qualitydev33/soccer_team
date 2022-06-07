export function checkNull(val) {
    return val === null || val === undefined || String(val).toLowerCase() === "n/a"
}