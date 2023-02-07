export const getFirstError = (id, errors) => {
    const formRegister = document.getElementById(id)
    if (formRegister) {
        const inputs = Array.from(formRegister?.querySelectorAll('input[name]') ?? []).map((ipt) => ipt.name)
        const firstError = {}
        for (let i = 0; i < inputs.length; i++) {
            if (errors[inputs[i]]) {
                firstError[inputs[i]] = errors[inputs[i]]
                break
            }
            continue
        }
        return firstError
    }
    return []
}
