export const currency = (amount) => {
    // return Intl.NumberFormat('es', {
    //   style: 'currency',
    //   currency,
    //   useGrouping: false,
    //   maximumFractionDigits: 2,
    //   currencyDisplay: 'code',
    // })
    //   .format(amount)
    //   .replace(',', '.')

    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        maximumFractionDigits: 2,
    }).format(Number(amount) / 100)
}

export const currencyAT = (amount) => {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        maximumFractionDigits: 2,
    }).format(amount)
}
