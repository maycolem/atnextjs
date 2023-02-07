export interface FormValues {
    email: string
    password: string
    confirm_password: string
    gender: string
    national_id_type: string
    national_id: string
    birthday: string
    firstname: string
    lastname: string
    mobile: string
    country: string
    state: string
    province: string
    agent_shop: string
    preferences: string
    city: string
    address: string
    promotion: string
    mobile_code: string
    email_code: string
    terms_and_Conditions: boolean
    verified: boolean
    alias: string
    currency: string
    agent: string
    unverifiedReason: {
        title: string
        content: string
    }
    // custom validate
    validateCodeAT?: any
    captcha: string
}
