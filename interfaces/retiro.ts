export interface Retiro {
    method:             string;
    name:               string;
    limits:             Limits;
    account_type:       string;
    account_precreated: boolean;
    account_fields:     AccountField[];
    payoutURL?:         string;
}

export interface AccountField {
    label: string;
    name:  string;
}

export interface Limits {
    min: string;
    max: string;
}
