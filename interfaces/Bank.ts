export interface Bank {
    bank: string
    name: string
    popular_name: string
    code: null | string
}

export interface BankType {
    type: string
    name: string
}

export interface BankAccount {
    name: string
    type: string
    config: {
        cci: string
        bank_name: string
        account_type: string
        account_number: string
    }
}
