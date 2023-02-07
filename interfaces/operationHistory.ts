export interface OperationHistory {
    db: number
    company: string
    operation: number
    user: number
    currency: string
    method: string
    method_account: null
    operation_date: Date
    type: string
    status: string
    provider: null
    machine: null
    shop: null
    terminal: null
    payment_account: null
    updated_date: Date
    amount: number
    previous_amount: number
    method_name: string
}
