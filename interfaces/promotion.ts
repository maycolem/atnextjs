export interface UserClaimPromotion {
    account: string
    activation_date: null
    amount: number
    cancelled_admin: null
    cancelled_date: null
    code: string
    comments: string
    company: string
    created_date: Date
    db: number
    expiration_date: Date
    external_id: null
    idempotence: null
    initial_amount: number
    initial_wr: number
    last_transaction: null
    priority: number
    promotion: string
    promotion_name: string
    provider: null
    redeemed_date: null
    status: string
    user: number
    user_promotion_id: number
    wr: number
}
export interface UserPromotion {
    db: number
    user_promotion_id: number
    company: string
    user: number
    promotion: UserPromotionDetail
    created_date: Date
    status: string
    initial_amount: number
    amount: number
    provider: string
    redeemed_date: null
    expiration_date: Date
    activation_date: null
    code: null
    idempotence: null
    cancelled_date: null
    cancelled_admin: null
    last_transaction: null
    cancellable: boolean
    type: string
}

export interface UserPromotionDetail {
    promotion: string
    summary_title: string
    summary_body: string
}
