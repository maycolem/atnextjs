export interface UserBankAccount {
    payment_account: number
    name: string
    type: string
    details: UserBankAccountDetails
    status: string
}

export interface UserBankAccountDetails {
    cci: string
    bank_name: string
    account_type: string
    account_number: string
}
