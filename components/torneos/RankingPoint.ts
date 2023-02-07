export const RankingPoint = (value: number) => {
    return new Intl.NumberFormat('es-PE', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    }).format(value)
}
