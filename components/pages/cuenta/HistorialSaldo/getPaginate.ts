export const getPagingData = (
    totalItems: number,
    page: number,
    limit: number,
    size: number
): { totalItems: number; totalPages: number; currentPage: number } => {
    const currentPage = page ? +page : 0
    const _totalPage = Math.ceil(totalItems / limit)
    const totalPages = getRealTotalPage(size, _totalPage, totalItems)
    return { totalItems, totalPages, currentPage }
}
export const getPagination = (page: number, size: number): { init: string; end: string; limit: string } => {
    page -= 1
    const limit = size ? +size : 3
    const init = page ? page * limit + page : 0
    // const init = page ? page * limit : 0
    const end = init + limit
    return { init: String(init), end: String(end), limit: String(limit) }
}

export const getRealTotalPage = (size: number, totalPages: number, totalItems: number): number => {
    const size_real = size + 1
    let end_range_total_page = 0
    for (let i = totalPages; i > -1; i--) {
        if (i * size_real - size_real <= totalItems) {
            end_range_total_page = i
            break
        }
    }
    return end_range_total_page
}
