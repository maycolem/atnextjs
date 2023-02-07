export interface User extends Detail {
    session: string
    activeCasinoBonus?: boolean
    totalAmount?: number
    depositCash?: number
    bettingBonus?: number
    casinoBonus?: number
    saldoRetirable?: number
    totalBonus?: number
    image?: string
}

export interface Detail {
    db: number
    alias: string
    user: number
    email: string
    firstName: string
    lastName: string
    birthday: Date
    gender: string
    country: string
    address: string
    state: string
    stateName: string
    province: string
    provinceName: string
    city: string
    cityName: string
    middleName: null
    mobile: string
    regulatory_status: string
    currency: string
    company: string
    otp: null
    lastLogin: Date
    national_id: string
    national_id_type: string
    website: string
    verified: number
    countryName: string
    accounts: Account[]
    groups: number[]
    limits: LimitsDeposit
}

export interface Account {
    db: number
    company: string
    user: number
    account: string
    currency: string
    amount: number
    updated_date: Date
    active: number
    machines: null
    forbidden_machines: null
    status: string
    last_call: Date
}

export interface LimitsDeposit {
    DAILY_DEPOSIT: number
    MONTHLY_DEPOSIT: number
    WEEKLY_DEPOSIT: number
}
