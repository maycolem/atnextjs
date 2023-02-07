export interface Response {
    company: string
    event: string
    ip: string
    result: results
    description?: string
    code?: number
}
type results = 'OK' | 'error'
