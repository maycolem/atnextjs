export interface File {
    result: Result
    db: number
    user: number
    file: number
    company: Company
    status: Status
    created_date: Date
    type: Type
    expiration_date: null
    path: string
    comments: Comments
    extra: null
    reviewer: number
    review_date: Date
    ip: IP
}

export enum Comments {
    Test = 'TEST',
    Undefined = 'undefined',
}

export enum Company {
    Atp = 'ATP',
}

export enum IP {
    The18166176205 = '181.66.176.205',
}

export enum Result {
    Ok = 'OK',
}

export enum Status {
    Denied = 'DENIED',
}

export enum Type {
    Identity = 'IDENTITY',
}
