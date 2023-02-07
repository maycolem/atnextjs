export interface BetsHistory {
    db: number
    operation: number
    game: string
    created_date: Date
    status: string
    wager: number
    winning: number | null
    odds: number
    type: string
    account: string
}
