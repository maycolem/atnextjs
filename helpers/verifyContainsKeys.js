export const verifyContainsKeys = (obj, ...keys) => {
    return keys.every((key) => key in obj)
}
